import express from "express"
import { applyToJob } from "../controllers/applyToJobController.js"
import { getJobApplications } from "../controllers/getJobApplicationsController.js"
import { updateApplicationStatus } from "../controllers/updateApplicationStatusController.js"

const router = express.Router()

// Job application routes
router.post("/jobs/:id/apply", applyToJob)
router.get("/jobs/applications", getJobApplications)
router.put("/jobs/applications/:id/status", updateApplicationStatus)

export { router as applicationRoutes }
