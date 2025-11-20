import { Request, Response } from "express"
import { Op } from "sequelize"
import { News } from "../../models/index.js"

// GET /news - Fetch all news with optional filters and pagination
export const getAllNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      pageNumber = "1",
      limit = "10",
      order = "DESC",
      orderBy = "createdAt",
      search,
      category,
    } = req.query

    const offset = (parseInt(pageNumber as string) - 1) * parseInt(limit as string)
    const limitNum = parseInt(limit as string)

    // Build where clause for filtering
    const where: any = {}

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { category: { [Op.iLike]: `%${search}%` } },
      ]
    }

    if (category) {
      where.category = { [Op.iLike]: `%${category}%` }
    }

    // Get total count for pagination
    const totalCount = await News.count({ where })

    // Get news with pagination and ordering
    const news = await News.findAll({
      where,
      offset,
      limit: limitNum,
      order: [[orderBy as string, (order as string).toUpperCase()]],
    })

    const transformedNews = news.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.image,
      content: item.content,
      publishedAt: item.publishedAt?.toISOString() || null,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }))

    return res.json({
      count: totalCount,
      rows: transformedNews,
      pagination: {
        currentPage: parseInt(pageNumber as string),
        totalPages: Math.ceil(totalCount / limitNum),
        limit: limitNum,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return res.status(500).json({ error: "Failed to fetch news" })
  }
}

