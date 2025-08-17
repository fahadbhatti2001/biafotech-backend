import express from "express"
import { getTotalFunds } from "../controller/funds.js"
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getJobApplications,
  updateApplicationStatus,
  getJobsAsCards
} from "../controller/jobs.js"

const router = express.Router()

// Main route
router.get("/", getTotalFunds)

// Job routes
router.get("/jobs", getAllJobs)
router.get("/jobs/cards", getJobsAsCards) // Must come before /:id route
router.get("/jobs/:id", getJobById)
router.post("/jobs", createJob)
router.put("/jobs/:id", updateJob)
router.delete("/jobs/:id", deleteJob)

// Job application routes
router.post("/jobs/:id/apply", applyToJob)
router.get("/jobs/applications", getJobApplications)
router.put("/jobs/applications/:id/status", updateApplicationStatus)

export { router }
