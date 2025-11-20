import { Request, Response } from "express"
import { Portfolio } from "../../models/index.js"

// GET /portfolio/:id - Fetch single portfolio item by ID
export const getPortfolioById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const portfolio = await Portfolio.findByPk(parseInt(id))

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio item not found" })
    }

    return res.json({
      id: portfolio.id,
      title: portfolio.title,
      client: portfolio.client,
      category: portfolio.category,
      description: portfolio.description,
      image: portfolio.image,
      technologies: portfolio.technologies,
      projectUrl: portfolio.projectUrl,
      createdAt: portfolio.createdAt.toISOString(),
      updatedAt: portfolio.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return res.status(500).json({ error: "Failed to fetch portfolio" })
  }
}

