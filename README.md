# 🚀 Biafotech Backend - TypeScript Edition

A modern, scalable Node.js backend built with **TypeScript**, **Express**, and **Sequelize**. Features a clean architecture with "one function per file" principle, complete type safety, production-ready build process, and comprehensive job application management system.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 🌟 Key Features

- ✅ **Full TypeScript Support** - Complete type safety with strict checking
- ✅ **Clean Architecture** - Organized controller structure with feature folders
- ✅ **Centralized Routes** - Route constants for maintainable API structure
- ✅ **Type-Safe Database** - Sequelize ORM with TypeScript integration and auto-sync
- ✅ **Modern Development** - Hot reloading with tsx, source maps, and build optimization
- ✅ **Production Ready** - Compiled JavaScript output with ES modules support
- ✅ **Comprehensive API** - Complete job management and application tracking system
- ✅ **Authentication System** - JWT-based authentication with bcrypt password hashing
- ✅ **Advanced Filtering** - Search, pagination, and filtering for jobs and applications
- ✅ **Data Transformers** - Clean separation between database and API response formats
- ✅ **Scalable Structure** - Easy to extend and maintain with organized folders

## 📋 Table of Contents

- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [💻 Development](#-development)
- [📚 API Documentation](#-api-documentation)
- [🗄️ Database Schema](#️-database-schema)
- [🔧 TypeScript Features](#-typescript-features)
- [🚢 Deployment](#-deployment)
- [📈 Migration History](#-migration-history)
- [🤝 Contributing](#-contributing)

## 🛠️ Technology Stack

### **Core Technologies**

- **[Node.js 18+](https://nodejs.org/)** - Runtime environment
- **[TypeScript 5.9+](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Express.js 4.x](https://expressjs.com/)** - Web framework
- **[Sequelize 6.x](https://sequelize.org/)** - Database ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database

### **Security & Authentication**

- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - JWT authentication
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-Origin Resource Sharing

### **Development Tools**

- **[tsx](https://github.com/esbuild-kit/tsx)** - Fast TypeScript execution with hot reload
- **[Prettier](https://prettier.io/)** - Code formatting
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management

### **Production**

- **[Vercel](https://vercel.com/)** - Deployment platform
- **TypeScript Compiler** - Builds to optimized JavaScript

## 📁 Project Structure

```
biafotech-backend/
├── src/                              # TypeScript source code
│   ├── types/
│   │   └── index.ts                  # Comprehensive type definitions
│   ├── config/
│   │   └── database.ts               # Sequelize database configuration
│   ├── constants/                    # Application constants
│   │   └── routes.ts                 # Centralized route definitions with full paths
│   ├── models/                       # Sequelize data models
│   │   ├── index.ts                  # Database connection and model exports
│   │   ├── User.ts                   # User model (authentication)
│   │   ├── Job.ts                    # Job posting model
│   │   ├── JobResponsibility.ts      # Job responsibilities (one-to-many with Job)
│   │   └── JobApplication.ts         # Job applications (one-to-many with Job)
│   ├── controllers/                  # Organized controller functions
│   │   ├── auth/                     # Authentication controllers
│   │   │   ├── authController.ts     # Login with JWT token generation
│   │   │   └── index.ts              # Auth controller exports
│   │   ├── health/                   # Health check controllers
│   │   │   ├── healthController.ts   # Health check endpoint
│   │   │   └── index.ts              # Health controller exports
│   │   ├── jobs/                     # Job management controllers (7 controllers)
│   │   │   ├── getAllJobsController.ts           # Advanced job listing with filters
│   │   │   ├── getJobByIdController.ts           # Single job retrieval
│   │   │   ├── createJobController.ts            # Job creation with validations
│   │   │   ├── updateJobController.ts            # Job updates (partial updates)
│   │   │   ├── deleteJobController.ts            # Job soft deletion
│   │   │   ├── getJobsAsCardsController.ts       # Job cards format for UI
│   │   │   └── index.ts                          # Job controller exports
│   │   └── applications/             # Application controllers (3 controllers)
│   │       ├── applyToJobController.ts           # Submit job applications
│   │       ├── getJobApplicationsController.ts   # Application listing with filters
│   │       ├── updateApplicationStatusController.ts # Status updates (5 states)
│   │       └── index.ts                          # Application controller exports
│   ├── routes/                       # Route definitions by resource
│   │   ├── healthRoutes.ts           # Health check routes
│   │   ├── authRoutes.ts             # Authentication routes (/auth)
│   │   ├── jobRoutes.ts              # Job management routes (/jobs)
│   │   └── applicationRoutes.ts      # Application routes (/jobs/:id/apply, etc.)
│   ├── utils/                        # Type-safe utility functions
│   │   ├── index.ts                  # Utility exports
│   │   ├── jobTransformers.ts        # Job data transformations (DB ↔ API)
│   │   └── applicationTransformers.ts # Application transformations (DB ↔ API)
│   └── index.ts                      # Main application entry point
├── dist/                             # Compiled JavaScript (auto-generated, not committed)
├── prisma/                           # Legacy Prisma schema (kept for reference)
│   ├── schema.prisma                 # Original database schema
│   └── migrations/                   # Original migrations
├── tsconfig.json                     # TypeScript strict configuration
├── tsconfig.node.json                # Node-specific TypeScript config
├── package.json                      # Dependencies and scripts
├── vercel.json                       # Vercel deployment configuration
├── MIGRATION_NOTES.md                # Prisma → Sequelize migration guide
└── README.md                         # This file
```

## 🚀 Getting Started

### **Prerequisites**

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or cloud)

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/your-username/biafotech-backend.git
cd biafotech-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
# Create .env file
cp .env.example .env

# Add your configuration
DATABASE_URL="postgresql://username:password@localhost:5432/biafotech"
JWT_SECRET="your-super-secure-jwt-secret"
PORT=4000
NODE_ENV=development
```

4. **Setup database**

The database will automatically sync when you start the server in development mode. Sequelize will create/update tables based on your models.

```bash
# Database auto-syncs on server start in development
# No manual migrations needed for development

# (Optional) You can use Prisma schema as reference
# The project has migrated to Sequelize but Prisma files are kept for reference
```

5. **Start development server**

```bash
npm run dev
```

🎉 **Your server is now running at** `http://localhost:4000`

## 💻 Development

### **Available Scripts**

```bash
# Development (TypeScript with hot reload)
npm run dev              # Run with tsx (fast TypeScript execution)
npm run dev:watch        # Watch mode with tsx (hot reload on file changes)

# Production Build
npm run build            # Compile TypeScript → dist/ (ES modules)
npm start               # Run compiled JavaScript from dist/

# Type Checking & Quality
npm run type-check      # TypeScript validation without build
npm run format          # Format code with Prettier

# Database
# Note: Database auto-syncs in development mode
# Sequelize creates/updates tables automatically based on models
```

### **Development Workflow**

1. **Write TypeScript code** in `src/` directory
2. **Run `npm run dev`** for development with hot reload
3. **Use `npm run type-check`** to validate types
4. **Build with `npm run build`** for production
5. **Deploy with `npm start`** (runs compiled JavaScript)

### **Adding New Features**

1. **Create feature folder** in `src/controllers/newFeature/`
2. **Create controller** in `src/controllers/newFeature/newFeatureController.ts`
3. **Create index file** in `src/controllers/newFeature/index.ts`
4. **Add routes** in `src/routes/newFeatureRoutes.ts`
5. **Add route constants** in `src/constants/routes.ts`
6. **Define types** in `src/types/index.ts`
7. **Add transformers** if needed in `src/utils/`
8. **Update main app** in `src/index.ts` to include routes

## 📚 API Documentation

### **Base URL**

- **Development**: `http://localhost:4000`
- **Production**: `https://your-app.vercel.app`

### **API Endpoints Overview**

| Category       | Base Path | Description                |
| -------------- | --------- | -------------------------- |
| Health         | `/`       | Health check endpoint      |
| Authentication | `/auth`   | User authentication        |
| Jobs           | `/jobs`   | Job management operations  |
| Applications   | `/`       | Job application operations |

### **Authentication**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### **Jobs Management**

#### **Get All Jobs**

```http
GET /jobs?pageNumber=1&limit=10&search=developer&type=full-time
```

#### **Get Single Job**

```http
GET /jobs/{id}
```

#### **Create Job**

```http
POST /jobs
Content-Type: application/json

{
  "title": "Senior TypeScript Developer",
  "description": "Looking for an experienced TypeScript developer...",
  "jobType": "full-time",
  "workExperience": "5+ years",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "salary": "$120,000 - $150,000",
  "requirements": ["TypeScript", "Node.js", "React"],
  "qualifications": ["Bachelor's degree", "5+ years experience"],
  "responsibilities": [
    {
      "title": "Development",
      "points": ["Build scalable applications", "Code reviews"]
    }
  ]
}
```

#### **Update Job**

```http
PUT /jobs/{id}
Content-Type: application/json

{
  "jobInformation": {
    "title": "Updated Job Title",
    "salary": "$130,000 - $160,000"
  },
  "isActive": true
}
```

#### **Delete Job (Soft Delete)**

```http
DELETE /jobs/{id}
```

### **Job Applications**

#### **Apply to Job**

```http
POST /jobs/{id}/apply
Content-Type: application/json

{
  "applicantName": "John Doe",
  "applicantEmail": "john@example.com",
  "resumeUrl": "https://example.com/resume.pdf",
  "coverLetter": "I am excited to apply..."
}
```

#### **Get Applications**

```http
GET /jobs/applications?jobId=1&status=pending&pageNumber=1&limit=10
```

#### **Update Application Status**

```http
PUT /jobs/applications/{id}/status
Content-Type: application/json

{
  "status": "reviewed"  // pending | reviewed | interview | rejected | hired
}
```

### **Health Check**

```http
GET /
```

**Response:**

```json
{
  "title": "Success",
  "message": "The app is working properly!"
}
```

## 🗄️ Database Schema

### **Main Tables**

- **`User`** - System users and authentication
- **`Job`** - Job postings with full details
- **`JobResponsibility`** - Structured job responsibilities
- **`JobApplication`** - Job applications from candidates

### **Key Relationships**

- `Job` → `JobResponsibility` (One-to-Many)
- `Job` → `JobApplication` (One-to-Many)
- `User` → `Job` (One-to-Many, via `createdBy`)

### **Database Operations**

```bash
# Sequelize automatically syncs models to database in development
# Models are defined in src/models/

# View models:
# - src/models/User.ts - User authentication
# - src/models/Job.ts - Job postings
# - src/models/JobResponsibility.ts - Job responsibilities
# - src/models/JobApplication.ts - Job applications

# Database connection managed in src/config/database.ts
# Auto-sync configuration: { alter: true } in development mode
# For production migrations, use Sequelize CLI (recommended)
```

## 🔧 TypeScript Features

### **Complete Type Safety**

```typescript
// Type-safe API handlers
export const createJob = async (
  req: JobCreateRequest,
  res: Response,
): Promise<Response> => {
  // req.body is fully typed
  const { title, description, jobType } = req.body
  // TypeScript ensures all required fields are present
}

// Type-safe database operations with Sequelize
const job = await Job.create({
  title,
  description,
  jobType: transformJobTypeForDB(jobType),
  // All fields are type-checked
})

// Type-safe queries with includes
const jobWithDetails = await Job.findByPk(id, {
  include: [
    { model: JobResponsibility, as: 'responsibilities' },
    { model: JobApplication, as: 'applications' }
  ]
})
```

### **Comprehensive Type Definitions**

- **Request/Response Types**: `AuthRequest`, `JobCreateRequest`, `JobUpdateRequest`
- **Data Models**: `JobWithResponsibilities`, `TransformedJob`, `JobCardData`
- **API Types**: `PaginationResponse<T>`, `JobsQuery`, `ApplicationsQuery`
- **Utility Types**: `ControllerFunction<T>`, `EnvConfig`

### **Strict Compiler Settings**

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "exactOptionalPropertyTypes": true,
  "noUncheckedIndexedAccess": true
}
```

### **Development Benefits**

- 🎯 **Autocomplete**: Full IntelliSense support
- 🛡️ **Error Prevention**: Catch errors at compile-time
- 📖 **Self-Documenting**: Types serve as documentation
- 🔧 **Refactoring Safety**: Confident code changes
- 🚀 **Performance**: Optimized JavaScript output

## 🚢 Deployment

### **Vercel Deployment** (Recommended)

1. **Connect to Vercel**

```bash
npm i -g vercel
vercel login
vercel
```

2. **Environment Variables**
   Set in Vercel dashboard:

- `DATABASE_URL`
- `JWT_SECRET`
- `NODE_ENV=production`

3. **Build Settings**

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### **Manual Deployment**

1. **Build the project**

```bash
npm run build
```

2. **Deploy `dist/` folder**
   The compiled JavaScript in `dist/` is ready for any Node.js hosting.

3. **Set environment variables**
   Ensure all required environment variables are set in production.

## 📈 Migration History

### **v2.1.0 - Sequelize Migration** (Latest)

- ✅ **Migrated from Prisma to Sequelize** ORM
- ✅ **Auto-sync database** in development mode
- ✅ **Enhanced model relationships** with proper associations
- ✅ **Maintained full type safety** during ORM migration
- ✅ **Improved query flexibility** with Sequelize operators
- ✅ **Zero API breaking changes** - all endpoints work identically
- ✅ **ES modules support** with proper TypeScript configuration

### **v2.0.0 - TypeScript Migration**

- ✅ **Complete TypeScript conversion** from JavaScript
- ✅ **Full type safety** with strict compiler settings
- ✅ **Updated build process** with compiled output
- ✅ **Enhanced developer experience** with IntelliSense
- ✅ **Production-ready** TypeScript build pipeline
- ✅ **tsx integration** for fast development with hot reload

### **v1.1.0 - Architecture Reorganization**

- ✅ **Organized Controller Structure** - Controllers moved into feature-based folders
- ✅ **Route Constants** - Centralized route definitions in `src/constants/routes.ts`
- ✅ **Proper Base Paths** - Clear API structure with `/auth`, `/jobs` base routes
- ✅ **Index Files** - Clean exports from each controller folder
- ✅ **Maintainable Imports** - Updated all import paths for new structure

### **v1.0.0 - Initial Restructure**

- ✅ **"One function per file"** architecture
- ✅ **Clean folder structure** with separation of concerns
- ✅ **Modular design** for scalability
- ✅ **Prisma ORM integration** for database operations

### **Benefits of Recent Improvements**

1. **Better Organization**: Feature-based folder structure for controllers with models
2. **Centralized Routes**: All API paths defined in constants for easy maintenance
3. **Clear API Structure**: Proper base paths that identify functionality
4. **Flexible ORM**: Sequelize provides powerful query capabilities and migrations
5. **Auto-sync Database**: Development becomes faster with automatic schema updates
6. **Type-Safe Models**: Full TypeScript support in Sequelize models
7. **Enhanced Performance**: ES modules and optimized build process
8. **Developer Experience**: Fast hot reload with tsx, cleaner imports, better code organization

## 🤝 Contributing

### **Development Setup**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make changes with TypeScript
5. Run type check: `npm run type-check`
6. Test the build: `npm run build`
7. Commit changes: `git commit -m 'Add amazing feature'`
8. Push to branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### **Code Guidelines**

- ✅ **Use TypeScript** for all new code
- ✅ **One function per file** principle
- ✅ **Proper type annotations** for all functions
- ✅ **Follow existing patterns** in the codebase
- ✅ **Add JSDoc comments** for complex functions
- ✅ **Run type-check** before committing

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start development server (tsx with auto-reload)
npm run dev:watch        # Watch mode with hot reload
npm run type-check       # Check TypeScript types
npm run build           # Build for production (TypeScript → JavaScript)

# Database
# Sequelize auto-syncs models in development
# Models in src/models/ define database schema
# Check src/config/database.ts for connection settings

# Deployment
npm start              # Run production build (node dist/index.js)
npm run format        # Format code with Prettier
vercel                # Deploy to Vercel
```

---

**Made with ❤️ and TypeScript** | **Biafotech Backend v2.1.0**

---

## 📝 Additional Documentation

- **[MIGRATION_NOTES.md](./MIGRATION_NOTES.md)** - Prisma to Sequelize migration guide
- **[SEQUELIZE_SETUP.md](./SEQUELIZE_SETUP.md)** - Sequelize configuration details

## 🔗 Related Resources

- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Authentication Best Practices](https://jwt.io/introduction)
