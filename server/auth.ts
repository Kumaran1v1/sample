import bcrypt from 'bcryptjs';
import { User, type IUser, type CreateUserInput } from '@shared/schema';
import { connectDB } from './db';

// Password hashing utilities
export class AuthService {
  /**
   * Hash a plain text password
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a plain text password with a hashed password
   */
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Create a new user with hashed password
   */
  static async createUser(userData: CreateUserInput): Promise<IUser> {
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(userData.password);

    // Create new user
    const user = new User({
      ...userData,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();
    return user;
  }

  /**
   * Authenticate user with email and password
   */
  static async authenticateUser(email: string, password: string): Promise<IUser | null> {
    await connectDB();
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return null;
    }

    // Check password
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<IUser | null> {
    await connectDB();
    return await User.findById(userId);
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return await User.findOne({ email: email.toLowerCase() });
  }

  /**
   * Update user profile
   */
  static async updateUser(userId: string, updateData: Partial<CreateUserInput>): Promise<IUser | null> {
    await connectDB();
    
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    return await User.findByIdAndUpdate(
      userId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
  }

  /**
   * Update user profile (specific method for profile updates)
   */
  static async updateProfile(userId: string, profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    bio?: string;
    profileImageUrl?: string;
  }): Promise<IUser | null> {
    await connectDB();

    // If email is being updated, check if it's already taken
    if (profileData.email) {
      const existingUser = await User.findOne({
        email: profileData.email.toLowerCase(),
        _id: { $ne: userId }
      });
      if (existingUser) {
        throw new Error('Email is already taken by another user');
      }
      profileData.email = profileData.email.toLowerCase();
    }

    return await User.findByIdAndUpdate(
      userId,
      { ...profileData, updatedAt: new Date() },
      { new: true }
    );
  }

  /**
   * Change user password
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    await connectDB();

    // Get user with current password
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    // Verify current password
    const isCurrentPasswordValid = await this.comparePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return false;
    }

    // Hash new password and update
    const hashedNewPassword = await this.hashPassword(newPassword);
    await User.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
      updatedAt: new Date()
    });

    return true;
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string): Promise<boolean> {
    await connectDB();
    const result = await User.findByIdAndDelete(userId);
    return !!result;
  }
}
