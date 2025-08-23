import express from "express"
import {
  applyToJob,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applications/index.js"
import { APPLICATION_ROUTES } from "../constants/routes.js"

const router = express.Router()

// Job application routes
router.post(APPLICATION_ROUTES.APPLY_TO_JOB, applyToJob)
router.get(APPLICATION_ROUTES.GET_JOB_APPLICATIONS, getJobApplications)
router.put(
  APPLICATION_ROUTES.UPDATE_APPLICATION_STATUS,
  updateApplicationStatus,
)

export { router as applicationRoutes }
