import express from "express"
import { main } from "../controllers/healthController.js"

const router = express.Router()

// Health check route
router.get("/", main)

export { router as healthRoutes }
