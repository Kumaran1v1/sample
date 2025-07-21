import {
  User,
  Category,
  Template,
  Project,
  Favorite,
  type IUser,
  type ICategory,
  type ITemplate,
  type IProject,
  type IFavorite,
  type CreateUserInput,
  type CreateCategoryInput,
  type CreateTemplateInput,
  type CreateProjectInput,
  type CreateFavoriteInput,
} from "@shared/schema";
import { connectDB } from "./db";
import mongoose from "mongoose";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<IUser | null>;
  upsertUser(user: CreateUserInput): Promise<IUser>;
  
  // Category operations
  getCategories(): Promise<ICategory[]>;
  createCategory(category: CreateCategoryInput): Promise<ICategory>;
  
  // Template operations
  getTemplates(categoryId?: string, search?: string): Promise<ITemplate[]>;
  getTemplate(id: string): Promise<ITemplate | null>;
  createTemplate(template: CreateTemplateInput): Promise<ITemplate>;
  
  // Project operations
  getProjects(userId: string): Promise<IProject[]>;
  getProject(id: string): Promise<IProject | null>;
  createProject(project: CreateProjectInput): Promise<IProject>;
  updateProject(id: string, project: Partial<CreateProjectInput>): Promise<IProject | null>;
  deleteProject(id: string): Promise<void>;
  
  // Favorite operations
  getFavorites(userId: string): Promise<ITemplate[]>;
  addFavorite(favorite: CreateFavoriteInput): Promise<IFavorite>;
  removeFavorite(userId: string, templateId: string): Promise<void>;
  isFavorite(userId: string, templateId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<IUser | null> {
    await connectDB();
    return await User.findById(id);
  }

  async upsertUser(userData: CreateUserInput): Promise<IUser> {
    await connectDB();
    
    // Check if user exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      // Update existing user
      Object.assign(existingUser, userData);
      existingUser.updatedAt = new Date();
      return await existingUser.save();
    } else {
      // Create new user
      const user = new User(userData);
      return await user.save();
    }
  }

  // Category operations
  async getCategories(): Promise<ICategory[]> {
    await connectDB();
    return await Category.find().sort({ name: 1 });
  }

  async createCategory(categoryData: CreateCategoryInput): Promise<ICategory> {
    await connectDB();
    const category = new Category(categoryData);
    return await category.save();
  }

  // Template operations
  async getTemplates(categoryId?: string, search?: string): Promise<ITemplate[]> {
    await connectDB();
    
    let query: any = { isPublic: true };
    
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    return await Template.find(query)
      .populate('categoryId')
      .sort({ createdAt: -1 });
  }

  async getTemplate(id: string): Promise<ITemplate | null> {
    await connectDB();
    return await Template.findById(id).populate('categoryId');
  }

  async createTemplate(templateData: CreateTemplateInput): Promise<ITemplate> {
    await connectDB();
    const template = new Template(templateData);
    return await template.save();
  }

  // Project operations
  async getProjects(userId: string): Promise<IProject[]> {
    await connectDB();
    return await Project.find({ userId })
      .populate('templateId')
      .sort({ updatedAt: -1 });
  }

  async getProject(id: string): Promise<IProject | null> {
    await connectDB();
    return await Project.findById(id)
      .populate('userId')
      .populate('templateId');
  }

  async createProject(projectData: CreateProjectInput): Promise<IProject> {
    await connectDB();
    const project = new Project(projectData);
    return await project.save();
  }

  async updateProject(id: string, projectData: Partial<CreateProjectInput>): Promise<IProject | null> {
    await connectDB();
    return await Project.findByIdAndUpdate(
      id,
      { ...projectData, updatedAt: new Date() },
      { new: true }
    );
  }

  async deleteProject(id: string): Promise<void> {
    await connectDB();
    await Project.findByIdAndDelete(id);
  }

  // Favorite operations
  async getFavorites(userId: string): Promise<ITemplate[]> {
    await connectDB();
    const favorites = await Favorite.find({ userId }).populate('templateId');
    return favorites.map(fav => fav.templateId as ITemplate).filter(Boolean);
  }

  async addFavorite(favoriteData: CreateFavoriteInput): Promise<IFavorite> {
    await connectDB();
    
    // Check if already favorited
    const existing = await Favorite.findOne({
      userId: favoriteData.userId,
      templateId: favoriteData.templateId
    });
    
    if (existing) {
      return existing;
    }
    
    const favorite = new Favorite(favoriteData);
    return await favorite.save();
  }

  async removeFavorite(userId: string, templateId: string): Promise<void> {
    await connectDB();
    await Favorite.findOneAndDelete({ userId, templateId });
  }

  async isFavorite(userId: string, templateId: string): Promise<boolean> {
    await connectDB();
    const favorite = await Favorite.findOne({ userId, templateId });
    return !!favorite;
  }
}

// Export singleton instance
export const storage = new DatabaseStorage();
