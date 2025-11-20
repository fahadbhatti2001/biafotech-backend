import { Request, Response } from "express"
import { Op } from "sequelize"
import { Portfolio } from "../../models/index.js"

// GET /portfolio - Fetch all portfolio items with optional filters and pagination
export const getAllPortfolio = async (
  req: Request,
  res: Response,
): Promise<Response> => {
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
        { description: { [Op.iLike]: `%${search}%` } },
        { client: { [Op.iLike]: `%${search}%` } },
        { category: { [Op.iLike]: `%${search}%` } },
      ]
    }

    if (category) {
      where.category = { [Op.iLike]: `%${category}%` }
    }

    // Get total count for pagination
    const totalCount = await Portfolio.count({ where })

    // Get portfolio items with pagination and ordering
    const portfolio = await Portfolio.findAll({
      where,
      offset,
      limit: limitNum,
      order: [[orderBy as string, (order as string).toUpperCase()]],
    })

    const transformedPortfolio = portfolio.map((item) => ({
      id: item.id,
      title: item.title,
      client: item.client,
      category: item.category,
      description: item.description,
      image: item.image,
      technologies: item.technologies,
      projectUrl: item.projectUrl,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }))

    return res.json({
      count: totalCount,
      rows: transformedPortfolio,
      pagination: {
        currentPage: parseInt(pageNumber as string),
        totalPages: Math.ceil(totalCount / limitNum),
        limit: limitNum,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return res.status(500).json({ error: "Failed to fetch portfolio" })
  }
}

