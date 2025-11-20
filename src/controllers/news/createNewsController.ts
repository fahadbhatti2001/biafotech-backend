import { Response } from "express"
import { News } from "../../models/index.js"
import { Request } from "express"

interface NewsCreateRequest extends Request {
  body: {
    title: string
    category: string
    image: string
    content?: string
    publishedAt?: string
  }
}

// POST /news - Create new news
export const createNews = async (
  req: NewsCreateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { title, category, image, content, publishedAt } = req.body

    // Validate required fields
    if (!title || !category || !image) {
      return res.status(400).json({
        error: "Missing required fields: title, category, image",
      })
    }

    // Create news
    const news = await News.create({
      title,
      category,
      image,
      content: content || null,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    })

    return res.status(201).json({
      id: news.id,
      title: news.title,
      category: news.category,
      image: news.image,
      content: news.content,
      publishedAt: news.publishedAt?.toISOString() || null,
      createdAt: news.createdAt.toISOString(),
      updatedAt: news.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error creating news:", error)
    return res.status(500).json({ error: "Failed to create news" })
  }
}

