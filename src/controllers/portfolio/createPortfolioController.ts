import { Response } from "express"
import { Portfolio } from "../../models/index.js"
import { Request } from "express"

interface PortfolioCreateRequest extends Request {
  body: {
    title: string
    client: string
    category: string
    description: string
    image: string
    technologies: string[]
    projectUrl?: string
  }
}

// POST /portfolio - Create new portfolio item
export const createPortfolio = async (
  req: PortfolioCreateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { title, client, category, description, image, technologies, projectUrl } =
      req.body

    // Validate required fields
    if (!title || !client || !category || !description || !image) {
      return res.status(400).json({
        error:
          "Missing required fields: title, client, category, description, image",
      })
    }

    // Create portfolio item
    const portfolio = await Portfolio.create({
      title,
      client,
      category,
      description,
      image,
      technologies: technologies || [],
      projectUrl: projectUrl || null,
    })

    return res.status(201).json({
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
    console.error("Error creating portfolio:", error)
    return res.status(500).json({ error: "Failed to create portfolio" })
  }
}

