import express from "express"
import {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio/index.js"
import { PORTFOLIO_ROUTES } from "../constants/routes.js"

const router = express.Router()

// Portfolio routes
router.get(PORTFOLIO_ROUTES.GET_ALL, getAllPortfolio)
router.get(PORTFOLIO_ROUTES.GET_BY_ID, getPortfolioById)
router.post(PORTFOLIO_ROUTES.CREATE, createPortfolio)
router.put(PORTFOLIO_ROUTES.UPDATE, updatePortfolio)
router.delete(PORTFOLIO_ROUTES.DELETE, deletePortfolio)

export { router as portfolioRoutes }

