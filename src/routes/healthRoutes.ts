import express from "express"
import { main } from "../controllers/health/index.js"
import { HEALTH_ROUTES } from "../constants/routes.js"

const router = express.Router()

// Health check route
router.get(HEALTH_ROUTES.HEALTH_CHECK, main)

export { router as healthRoutes }
