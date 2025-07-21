import mongoose, { Schema, Document } from 'mongoose';
import { z } from "zod";

// User interface and schema for authentication
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  profileImageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// Category interface and schema
export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

// Template interface and schema
export interface ITemplate extends Document {
  _id: string;
  title: string;
  description?: string;
  categoryId?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  designData: any;
  isPremium: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const templateSchema = new Schema<ITemplate>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  thumbnailUrl: {
    type: String,
    trim: true,
  },
  previewUrl: {
    type: String,
    trim: true,
  },
  designData: {
    type: Schema.Types.Mixed,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Template = mongoose.models.Template || mongoose.model<ITemplate>('Template', templateSchema);

// Project interface and schema
export interface IProject extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  templateId?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  designData: any;
  thumbnailUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  designData: {
    type: Schema.Types.Mixed,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

// Favorite interface and schema
export interface IFavorite extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
}, {
  timestamps: true,
});

export const Favorite = mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', favoriteSchema);

// Notification interface and schema
export interface INotification extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  type: 'login' | 'create' | 'edit' | 'delete' | 'download' | 'share' | 'view';
  title: string;
  description: string;
  projectName?: string;
  projectType?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['login', 'create', 'edit', 'delete', 'download', 'share', 'view'],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  projectName: {
    type: String,
    trim: true,
  },
  projectType: {
    type: String,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);

// Export types for use in other parts of the application
export type UserType = IUser;
export type CategoryType = ICategory;
export type TemplateType = ITemplate;
export type ProjectType = IProject;
export type FavoriteType = IFavorite;
export type NotificationType = INotification;

// Input types for creating new documents (plain objects without Mongoose methods)
export interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface CreateTemplateInput {
  title: string;
  description?: string;
  categoryId?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  designData: any;
  isPremium?: boolean;
  isPublic?: boolean;
}

export interface CreateProjectInput {
  userId: string;
  templateId?: string;
  title: string;
  description?: string;
  designData: any;
  thumbnailUrl?: string;
  isPublic?: boolean;
}

export interface CreateFavoriteInput {
  userId: string;
  templateId: string;
}

// Zod validation schemas for input validation
export const insertUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().url().optional(),
});

export const insertCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const insertTemplateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  previewUrl: z.string().url().optional(),
  designData: z.any(),
  isPremium: z.boolean().default(false),
  isPublic: z.boolean().default(true),
});

export const insertProjectSchema = z.object({
  userId: z.string(),
  templateId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  designData: z.any(),
  thumbnailUrl: z.string().url().optional(),
  isPublic: z.boolean().default(false),
});

export const insertFavoriteSchema = z.object({
  userId: z.string(),
  templateId: z.string(),
});
