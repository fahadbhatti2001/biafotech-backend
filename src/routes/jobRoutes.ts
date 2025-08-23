import express from "express"
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsAsCards,
} from "../controllers/jobs/index.js"
import { JOB_ROUTES } from "../constants/routes.js"

const router = express.Router()

// Job routes
router.get(JOB_ROUTES.GET_ALL, getAllJobs)
router.get(JOB_ROUTES.GET_CARDS, getJobsAsCards) // Must come before /:id route
router.get(JOB_ROUTES.GET_BY_ID, getJobById)
router.post(JOB_ROUTES.CREATE, createJob)
router.put(JOB_ROUTES.UPDATE, updateJob)
router.delete(JOB_ROUTES.DELETE, deleteJob)

export { router as jobRoutes }
