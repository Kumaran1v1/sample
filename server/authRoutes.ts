import type { Express, Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import multer from "multer";
import path from "path";
import fs from "fs";
import { AuthService } from "./auth";
import { NotificationService } from "./notificationRoutes";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

// Session configuration
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be set for session storage");
  }
  
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set for session security");
  }

  return session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: sessionTtl / 1000, // TTL in seconds
      autoRemove: 'native',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

// Extend session interface to include user
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    user?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
    };
  }
}

// Authentication middleware
export const isAuthenticated = async (req: Request, res: Response, next: Function) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await AuthService.getUserById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request for use in routes
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export function setupAuthRoutes(app: Express) {
  // Setup session middleware
  app.use(getSession());

  // Signup endpoint
  app.post('/api/auth/signup', async (req: Request, res: Response) => {
    try {
      // Validate input
      const userData = insertUserSchema.parse(req.body);

      // Create user
      const user = await AuthService.createUser(userData);

      // Create session
      req.session.userId = user._id.toString();
      req.session.user = {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      // Return user data (without password)
      const { password, ...userWithoutPassword } = user.toObject();
      res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      
      if (error.message === 'User already exists with this email') {
        return res.status(409).json({ message: error.message });
      }
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login endpoint
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      // Validate input
      const { email, password } = loginSchema.parse(req.body);

      // Authenticate user
      const user = await AuthService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create session
      req.session.userId = user._id.toString();
      req.session.user = {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      // Create login notification
      await NotificationService.createLoginNotification(user._id.toString());

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.json({
        message: "Login successful",
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout endpoint
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Could not log out" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logout successful" });
    });
  });

  // Get current user endpoint
  app.get('/api/auth/user', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const { password, ...userWithoutPassword } = user.toObject();
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update profile endpoint
  app.put('/api/auth/profile', isAuthenticated, upload.single('profileImage'), async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const profileData = updateProfileSchema.parse(req.body);

      let profileImageUrl;
      if (req.file) {
        profileImageUrl = `/uploads/profiles/${req.file.filename}`;
      }

      const updatedUser = await AuthService.updateProfile(userId, {
        ...profileData,
        profileImageUrl
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update session
      req.session.user = {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      };

      const { password, ...userWithoutPassword } = updatedUser.toObject();
      res.json({
        message: "Profile updated successfully",
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Profile update error:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Change password endpoint
  app.put('/api/auth/change-password', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

      const success = await AuthService.changePassword(userId, currentPassword, newPassword);

      if (!success) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      res.json({ message: "Password changed successfully" });
    } catch (error: any) {
      console.error("Change password error:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  });
}
