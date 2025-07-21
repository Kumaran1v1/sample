# Design Studio Application

## Overview

This is a full-stack design studio application built with React, TypeScript, Express, and PostgreSQL. It allows users to create, edit, and manage design templates with a canvas-based editor. The application features authentication, template management, favoriting, and a real-time design editor.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit for global state, React Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage

### Database Schema
The application uses Drizzle ORM with PostgreSQL and includes:
- `users` table for user authentication (required for Replit Auth)
- `sessions` table for session storage (required for Replit Auth)
- `categories` table for template categorization
- `templates` table for design templates with JSON design data
- `projects` table for user projects
- `favorites` table for user favorite templates

## Key Components

### Authentication System
- Uses Replit Auth for secure authentication
- OpenID Connect integration with automatic user provisioning
- Session-based authentication with PostgreSQL storage
- Mandatory user and session tables for Replit Auth compliance

### Template Management
- CRUD operations for design templates
- Category-based organization
- Search and filtering capabilities
- Template favoriting system
- JSON-based design data storage

### Design Editor
- Canvas-based editor with drag-and-drop functionality
- Element manipulation (text, images, shapes)
- Properties panel for element customization
- Tool panel for adding new elements
- Real-time preview and editing

### State Management
- Redux slices for auth, templates, and editor state
- React Query for server state management and caching
- Optimistic updates for better user experience

## Data Flow

1. **Authentication Flow**: User authenticates via Replit Auth → session created → user data stored/retrieved
2. **Template Browsing**: Templates fetched from database → cached in React Query → displayed in grid
3. **Template Editing**: Template loaded → elements parsed → canvas rendered → changes tracked in Redux
4. **Template Saving**: Editor state serialized → sent to backend → stored in database

## External Dependencies

### UI Components
- **shadcn/ui**: Comprehensive UI component library built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework

### Database & Auth
- **Neon Database**: Serverless PostgreSQL database
- **Replit Auth**: Authentication service with OpenID Connect
- **Drizzle ORM**: Type-safe database toolkit

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and better developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development
- Runs on Vite development server with hot module replacement
- Backend serves API routes while Vite handles frontend
- Database migrations run via Drizzle Kit

### Production
- Frontend built with Vite and served as static files
- Backend bundled with ESBuild for optimal performance
- Environment variables for database connection and auth secrets
- Single deployment target with both frontend and backend

### Key Configuration
- `vite.config.ts`: Frontend build configuration with aliases
- `drizzle.config.ts`: Database schema and migration settings
- `package.json`: Scripts for development, building, and deployment
- Environment variables: `DATABASE_URL`, `SESSION_SECRET`, `REPL_ID`

The application follows a monorepo structure with shared TypeScript types, making it easy to maintain type safety across the full stack.