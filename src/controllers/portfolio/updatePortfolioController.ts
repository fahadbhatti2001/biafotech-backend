import { Response } from "express"
import { Portfolio } from "../../models/index.js"
import { Request } from "express"

interface PortfolioUpdateRequest extends Request {
  params: {
    id: string
  }
  body: {
    title?: string
    client?: string
    category?: string
    description?: string
    image?: string
    technologies?: string[]
    projectUrl?: string
  }
}

// PUT /portfolio/:id - Update existing portfolio item
export const updatePortfolio = async (
  req: PortfolioUpdateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const { title, client, category, description, image, technologies, projectUrl } =
      req.body

    // Check if portfolio exists
    const existingPortfolio = await Portfolio.findByPk(parseInt(id))

    if (!existingPortfolio) {
      return res.status(404).json({ error: "Portfolio item not found" })
    }

    // Build update data object (only include fields that are provided)
    const updateData: any = {}
    if (title) updateData.title = title
    if (client) updateData.client = client
    if (category) updateData.category = category
    if (description) updateData.description = description
    if (image) updateData.image = image
    if (technologies !== undefined) updateData.technologies = technologies
    if (projectUrl !== undefined) updateData.projectUrl = projectUrl

    // Update portfolio
    await existingPortfolio.update(updateData)

    // Fetch updated portfolio
    const updatedPortfolio = await Portfolio.findByPk(parseInt(id))

    return res.json({
      id: updatedPortfolio!.id,
      title: updatedPortfolio!.title,
      client: updatedPortfolio!.client,
      category: updatedPortfolio!.category,
      description: updatedPortfolio!.description,
      image: updatedPortfolio!.image,
      technologies: updatedPortfolio!.technologies,
      projectUrl: updatedPortfolio!.projectUrl,
      createdAt: updatedPortfolio!.createdAt.toISOString(),
      updatedAt: updatedPortfolio!.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error updating portfolio:", error)
    return res.status(500).json({ error: "Failed to update portfolio" })
  }
}

