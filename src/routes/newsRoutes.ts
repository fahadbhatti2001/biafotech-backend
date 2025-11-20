import express from "express"
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news/index.js"
import { NEWS_ROUTES } from "../constants/routes.js"

const router = express.Router()

// News routes
router.get(NEWS_ROUTES.GET_ALL, getAllNews)
router.get(NEWS_ROUTES.GET_BY_ID, getNewsById)
router.post(NEWS_ROUTES.CREATE, createNews)
router.put(NEWS_ROUTES.UPDATE, updateNews)
router.delete(NEWS_ROUTES.DELETE, deleteNews)

export { router as newsRoutes }

