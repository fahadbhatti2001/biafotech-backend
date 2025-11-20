import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { healthRoutes } from "./routes/healthRoutes.js"
import { authRoutes } from "./routes/authRoutes.js"
import { jobRoutes } from "./routes/jobRoutes.js"
import { applicationRoutes } from "./routes/applicationRoutes.js"
import { newsRoutes } from "./routes/newsRoutes.js"
import { portfolioRoutes } from "./routes/portfolioRoutes.js"
import { API_ROUTES } from "./constants/routes.js"
import { syncDatabase } from "./config/database.js"

// Load environment variables
dotenv.config()

const app = express()
const port: number = parseInt(process.env.PORT || "4000")
const nodeEnv: string = process.env.NODE_ENV || "development"

app.use(express.json())
app.use(cors())

// Mount routes with proper base paths
app.use(API_ROUTES.HEALTH, healthRoutes)
app.use(API_ROUTES.AUTH, authRoutes)
app.use(API_ROUTES.JOBS, jobRoutes)
app.use(API_ROUTES.NEWS, newsRoutes)
app.use(API_ROUTES.PORTFOLIO, portfolioRoutes)
app.use("/", applicationRoutes) // Applications routes are job-related, so they stay at root level

// Initialize database connection and start server
syncDatabase().then(() => {
  app.listen(port, "0.0.0.0", (): void => {
    console.log(`Server running at http://localhost:${port}`)
    console.log(`Environment: ${nodeEnv}`)
  })
}).catch((error) => {
  console.error("Failed to initialize database:", error)
  process.exit(1)
})
