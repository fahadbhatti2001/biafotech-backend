import dotenv from "dotenv"
import express from "express"
import cors from "cors"

// Load environment variables
dotenv.config()
import { main } from "./controller/index.js"
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getJobApplications,
  updateApplicationStatus,
} from "./controller/jobs.js"

const app = express()
const port = process.env.PORT || 4000
const nodeEnv = process.env.NODE_ENV || 'development'

app.use(express.json())
app.use(cors())

// Health check
app.get("/", main)

// Jobs routes
app.get("/jobs", getAllJobs)
app.get("/jobs/:id", getJobById)
app.post("/jobs", createJob)
app.put("/jobs/:id", updateJob)
app.delete("/jobs/:id", deleteJob)

// Job applications routes
app.post("/jobs/:id/apply", applyToJob)
app.get("/jobs/applications", getJobApplications)
app.put("/jobs/applications/:id/status", updateApplicationStatus)

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log(`Environment: ${nodeEnv}`)
})
