import express from "express"
import { login } from "../controllers/auth/index.js"
import { AUTH_ROUTES } from "../constants/routes.js"

const router = express.Router()

// Auth routes
router.post(AUTH_ROUTES.LOGIN, login)

export { router as authRoutes }
