import express from "express"
import { getAllJobs } from "../controllers/getAllJobsController.js"
import { getJobById } from "../controllers/getJobByIdController.js"
import { createJob } from "../controllers/createJobController.js"
import { updateJob } from "../controllers/updateJobController.js"
import { deleteJob } from "../controllers/deleteJobController.js"
import { getJobsAsCards } from "../controllers/getJobsAsCardsController.js"

const router = express.Router()

// Job routes
router.get("/", getAllJobs)
router.get("/cards", getJobsAsCards) // Must come before /:id route
router.get("/:id", getJobById)
router.post("/", createJob)
router.put("/:id", updateJob)
router.delete("/:id", deleteJob)

export { router as jobRoutes }
