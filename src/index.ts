import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { healthRoutes } from "./routes/healthRoutes.js"
import { authRoutes } from "./routes/authRoutes.js"
import { jobRoutes } from "./routes/jobRoutes.js"
import { applicationRoutes } from "./routes/applicationRoutes.js"

// Load environment variables
dotenv.config()

const app = express()
const port: number = parseInt(process.env.PORT || "4000")
const nodeEnv: string = process.env.NODE_ENV || "development"

app.use(express.json())
app.use(cors())

// Mount routes
app.use("/", healthRoutes)
app.use("/", authRoutes)
app.use("/jobs", jobRoutes)
app.use("/", applicationRoutes)

app.listen(port, "0.0.0.0", (): void => {
  console.log(`Server running at http://localhost:${port}`)
  console.log(`Environment: ${nodeEnv}`)
})
