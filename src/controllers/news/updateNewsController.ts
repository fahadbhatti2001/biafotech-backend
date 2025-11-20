import { Response } from "express"
import { News } from "../../models/index.js"
import { Request } from "express"

interface NewsUpdateRequest extends Request {
  params: {
    id: string
  }
  body: {
    title?: string
    category?: string
    image?: string
    content?: string
    publishedAt?: string
  }
}

// PUT /news/:id - Update existing news
export const updateNews = async (
  req: NewsUpdateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const { title, category, image, content, publishedAt } = req.body

    // Check if news exists
    const existingNews = await News.findByPk(parseInt(id))

    if (!existingNews) {
      return res.status(404).json({ error: "News not found" })
    }

    // Build update data object (only include fields that are provided)
    const updateData: any = {}
    if (title) updateData.title = title
    if (category) updateData.category = category
    if (image) updateData.image = image
    if (content !== undefined) updateData.content = content
    if (publishedAt !== undefined) {
      updateData.publishedAt = publishedAt ? new Date(publishedAt) : null
    }

    // Update news
    await existingNews.update(updateData)

    // Fetch updated news
    const updatedNews = await News.findByPk(parseInt(id))

    return res.json({
      id: updatedNews!.id,
      title: updatedNews!.title,
      category: updatedNews!.category,
      image: updatedNews!.image,
      content: updatedNews!.content,
      publishedAt: updatedNews!.publishedAt?.toISOString() || null,
      createdAt: updatedNews!.createdAt.toISOString(),
      updatedAt: updatedNews!.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error updating news:", error)
    return res.status(500).json({ error: "Failed to update news" })
  }
}

