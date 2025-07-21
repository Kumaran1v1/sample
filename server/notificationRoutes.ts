import type { Express, Request, Response } from "express";
import { isAuthenticated } from "./authRoutes";
import { Notification, type INotification } from "@shared/schema";
import { connectDB } from "./db";

export function setupNotificationRoutes(app: Express) {
  // Get user notifications
  app.get('/api/notifications', isAuthenticated, async (req: Request, res: Response) => {
    try {
      await connectDB();
      const userId = req.session.userId!;
      
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(50);

      res.json({ notifications });
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mark notification as read
  app.put('/api/notifications/:id/read', isAuthenticated, async (req: Request, res: Response) => {
    try {
      await connectDB();
      const userId = req.session.userId!;
      const notificationId = req.params.id;

      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { read: true, updatedAt: new Date() },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      res.json({ message: "Notification marked as read", notification });
    } catch (error) {
      console.error("Mark notification as read error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mark all notifications as read
  app.put('/api/notifications/mark-all-read', isAuthenticated, async (req: Request, res: Response) => {
    try {
      await connectDB();
      const userId = req.session.userId!;

      await Notification.updateMany(
        { userId, read: false },
        { read: true, updatedAt: new Date() }
      );

      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Mark all notifications as read error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Clear all notifications
  app.delete('/api/notifications', isAuthenticated, async (req: Request, res: Response) => {
    try {
      await connectDB();
      const userId = req.session.userId!;

      await Notification.deleteMany({ userId });

      res.json({ message: "All notifications cleared" });
    } catch (error) {
      console.error("Clear notifications error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create notification (internal use)
  app.post('/api/notifications', isAuthenticated, async (req: Request, res: Response) => {
    try {
      await connectDB();
      const userId = req.session.userId!;
      const { type, title, description, projectName, projectType } = req.body;

      const notification = new Notification({
        userId,
        type,
        title,
        description,
        projectName,
        projectType,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await notification.save();

      res.status(201).json({ message: "Notification created", notification });
    } catch (error) {
      console.error("Create notification error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

// Utility function to create notifications
export class NotificationService {
  static async createNotification(
    userId: string,
    type: 'login' | 'create' | 'edit' | 'delete' | 'download' | 'share' | 'view',
    title: string,
    description: string,
    projectName?: string,
    projectType?: string
  ): Promise<INotification | null> {
    try {
      await connectDB();
      
      const notification = new Notification({
        userId,
        type,
        title,
        description,
        projectName,
        projectType,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await notification.save();
      return notification;
    } catch (error) {
      console.error("Create notification error:", error);
      return null;
    }
  }

  static async createLoginNotification(userId: string): Promise<void> {
    await this.createNotification(
      userId,
      'login',
      'Login Activity',
      'You logged in successfully'
    );
  }

  static async createProjectNotification(
    userId: string,
    type: 'create' | 'edit' | 'delete',
    projectName: string,
    projectType: string
  ): Promise<void> {
    const actions = {
      create: { title: 'Project Created', description: `Created new ${projectType.toLowerCase()} "${projectName}"` },
      edit: { title: 'Project Updated', description: `Edited "${projectName}" ${projectType.toLowerCase()}` },
      delete: { title: 'Project Deleted', description: `Moved "${projectName}" to trash` }
    };

    const action = actions[type];
    await this.createNotification(
      userId,
      type,
      action.title,
      action.description,
      projectName,
      projectType
    );
  }
}
