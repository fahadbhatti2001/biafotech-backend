# 🚀 Biafotech Backend - TypeScript Edition

A modern, scalable Node.js backend built with **TypeScript**, **Express**, and **Prisma**. Features a clean architecture with "one function per file" principle, complete type safety, and production-ready build process.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)

## 🌟 Key Features

- ✅ **Full TypeScript Support** - Complete type safety with strict checking
- ✅ **Clean Architecture** - Organized controller structure with feature folders
- ✅ **Centralized Routes** - Route constants for maintainable API structure
- ✅ **Type-Safe Database** - Prisma ORM with TypeScript integration
- ✅ **Modern Development** - Hot reloading, source maps, and build optimization
- ✅ **Production Ready** - Compiled JavaScript output with declarations
- ✅ **Comprehensive API** - Job management and application system with proper base paths
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
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Express.js](https://expressjs.com/)** - Web framework
- **[Prisma](https://prisma.io/)** - Database ORM with type safety

### **Development Tools**

- **[ts-node](https://typestrong.org/ts-node/)** - TypeScript execution for development
- **[Nodemon](https://nodemon.io/)** - Auto-restart during development
- **[Prettier](https://prettier.io/)** - Code formatting

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
│   │   └── database.ts               # Database configuration
│   ├── constants/                    # Application constants
│   │   └── routes.ts                 # Centralized route definitions
│   ├── controllers/                  # Organized controller functions
│   │   ├── auth/                     # Authentication controllers
│   │   │   ├── authController.ts     # User authentication logic
│   │   │   └── index.ts              # Auth controller exports
│   │   ├── health/                   # Health check controllers
│   │   │   ├── healthController.ts   # Health check endpoint
│   │   │   └── index.ts              # Health controller exports
│   │   ├── jobs/                     # Job management controllers
│   │   │   ├── getAllJobsController.ts           # Job listing with filters
│   │   │   ├── getJobByIdController.ts           # Single job retrieval
│   │   │   ├── createJobController.ts            # Job creation
│   │   │   ├── updateJobController.ts            # Job updates
│   │   │   ├── deleteJobController.ts            # Job soft deletion
│   │   │   ├── getJobsAsCardsController.ts       # Job cards format
│   │   │   └── index.ts                          # Job controller exports
│   │   └── applications/             # Application controllers
│   │       ├── applyToJobController.ts           # Job applications
│   │       ├── getJobApplicationsController.ts   # Application listing
│   │       ├── updateApplicationStatusController.ts # Status updates
│   │       └── index.ts                          # Application controller exports
│   ├── routes/                       # Route definitions by resource
│   │   ├── healthRoutes.ts           # Health check routes
│   │   ├── authRoutes.ts             # Authentication routes
│   │   ├── jobRoutes.ts              # Job management routes
│   │   └── applicationRoutes.ts      # Application routes
│   ├── utils/                        # Type-safe utility functions
│   │   ├── jobTransformers.ts        # Job data transformations
│   │   └── applicationTransformers.ts # Application transformations
│   ├── services/                     # Business logic layer (expandable)
│   ├── middlewares/                  # Custom middleware (expandable)
│   └── index.ts                      # Main TypeScript application
├── dist/                             # Compiled JavaScript (auto-generated)
├── prisma/                           # Database schema and migrations
│   ├── schema.prisma                 # Database schema definition
│   ├── migrations/                   # Database migrations
│   └── seed.js                       # Database seeding script
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
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

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database
npm run seed
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
npm run dev              # Run with ts-node
npm run dev:watch        # Watch mode with nodemon + ts-node

# Production Build
npm run build            # Compile TypeScript → dist/
npm start               # Run compiled JavaScript

# Type Checking & Quality
npm run type-check      # TypeScript validation without build
npm run format          # Format code with Prettier

# Database
npm run seed            # Seed database with sample data
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
# View database in Prisma Studio
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Deploy new migrations
npx prisma migrate deploy

# Generate TypeScript client
npx prisma generate
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
}

// Type-safe database operations
const job = await prisma.job.create({
  data: {
    jobType: transformJobTypeForDB(jobType) as JobType,
    // All fields are type-checked
  },
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

### **v2.0.0 - TypeScript Migration** (Latest)

- ✅ **Complete TypeScript conversion** from JavaScript
- ✅ **Full type safety** with strict compiler settings
- ✅ **Updated build process** with compiled output
- ✅ **Enhanced developer experience** with IntelliSense
- ✅ **Production-ready** TypeScript build pipeline
- ✅ **Zero breaking changes** - maintains API compatibility

### **v1.1.0 - Architecture Reorganization** (Latest)

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

1. **Better Organization**: Feature-based folder structure for controllers
2. **Centralized Routes**: All API paths defined in constants for easy maintenance
3. **Clear API Structure**: Proper base paths that identify functionality
4. **Scalable Architecture**: Easy to add new features following established patterns
5. **Developer Experience**: Cleaner imports and better code organization

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
npm run dev              # Start development server
npm run type-check       # Check TypeScript types
npm run build           # Build for production

# Database
npx prisma studio       # Open database GUI
npx prisma generate     # Generate Prisma client
npm run seed           # Seed database

# Deployment
npm start              # Run production build
vercel                # Deploy to Vercel
```

---

**Made with ❤️ and TypeScript** | **Biafotech Backend v2.0.0**
