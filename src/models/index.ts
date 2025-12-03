import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { User, initUser } from "./User.js"
import { Job, initJob } from "./Job.js"
import { JobResponsibility, initJobResponsibility } from "./JobResponsibility.js"
import { JobApplication, initJobApplication } from "./JobApplication.js"
import { News, initNews } from "./News.js"
import { Portfolio, initPortfolio } from "./Portfolio.js"

dotenv.config()

// Initialize Sequelize instance
console.log("DATABASE_URL:", process.env.DATABASE_URL);
export const sequelize = new Sequelize(
  process.env.DATABASE_URL || "",
  {
    dialect: "postgres",
    logging: false, // Disable SQL query logging for cleaner output
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
)

// Initialize all models
initUser(sequelize)
initJob(sequelize)
initJobResponsibility(sequelize)
initJobApplication(sequelize)
initNews(sequelize)
initPortfolio(sequelize)

// Define associations
Job.hasMany(JobResponsibility, {
  foreignKey: "jobId",
  as: "responsibilities",
  onDelete: "CASCADE",
})
JobResponsibility.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
})

Job.hasMany(JobApplication, {
  foreignKey: "jobId",
  as: "applications",
  onDelete: "CASCADE",
})
JobApplication.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
})

// Sync database (in development)
export const syncDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection established successfully.")
    
    // Sync database in development mode
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      console.log("Database synchronized.")
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    throw error
  }
}

// Export models
export { User, Job, JobResponsibility, JobApplication, News, Portfolio }

// Export enums
export { UserRole } from "./User.js"
export { JobType } from "./Job.js"
export { ApplicationStatus } from "./JobApplication.js"

