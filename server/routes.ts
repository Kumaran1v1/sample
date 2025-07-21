import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuthRoutes, isAuthenticated } from "./authRoutes";
import { setupNotificationRoutes, NotificationService } from "./notificationRoutes";
import { insertTemplateSchema, insertProjectSchema, insertCategorySchema, type CreateFavoriteInput } from "@shared/schema";
import { seedTemplates } from "./seedTemplates";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuthRoutes(app);

  // Setup notification routes
  setupNotificationRoutes(app);

  // Seeder route (for development only)
  app.post('/api/seed-templates', async (_req, res) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: "Seeding not allowed in production" });
      }

      const result = await seedTemplates();
      res.json({
        message: "Database seeded successfully",
        ...result
      });
    } catch (error) {
      console.error("Seeding error:", error);
      res.status(500).json({ message: "Failed to seed database" });
    }
  });

  // Category routes
  app.get('/api/categories', async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post('/api/categories', isAuthenticated, async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  // Template routes
  app.get('/api/templates', async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      const search = req.query.search as string;
      const templates = await storage.getTemplates(categoryId, search);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.get('/api/templates/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const template = await storage.getTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post('/api/templates', isAuthenticated, async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(templateData as any);
      res.json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(500).json({ message: "Failed to create template" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const projects = await storage.getProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const projectData = insertProjectSchema.parse({
        ...req.body,
        userId,
      });
      const project = await storage.createProject(projectData as any);

      // Create notification for project creation
      await NotificationService.createProjectNotification(
        userId,
        'create',
        project.title,
        'Project'
      );

      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user._id.toString();
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData as any);

      if (project) {
        // Create notification for project update
        await NotificationService.createProjectNotification(
          userId,
          'edit',
          project.title,
          'Project'
        );
      }

      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user._id.toString();

      // Get project details before deletion for notification
      const project = await storage.getProject(id);

      await storage.deleteProject(id);

      if (project) {
        // Create notification for project deletion
        await NotificationService.createProjectNotification(
          userId,
          'delete',
          project.title,
          'Project'
        );
      }

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Favorite routes
  app.get('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const { templateId } = req.body;
      const favoriteData: CreateFavoriteInput = { userId, templateId };
      const favorite = await storage.addFavorite(favoriteData);
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete('/api/favorites/:templateId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const templateId = req.params.templateId;
      await storage.removeFavorite(userId, templateId);
      res.json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  app.get('/api/favorites/:templateId/check', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user._id.toString();
      const templateId = req.params.templateId;
      const isFavorite = await storage.isFavorite(userId, templateId);
      res.json({ isFavorite });
    } catch (error) {
      console.error("Error checking favorite:", error);
      res.status(500).json({ message: "Failed to check favorite" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
