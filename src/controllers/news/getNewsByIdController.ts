import { Request, Response } from "express"
import { News } from "../../models/index.js"

// GET /news/:id - Fetch single news by ID
export const getNewsById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const news = await News.findByPk(parseInt(id))

    if (!news) {
      return res.status(404).json({ error: "News not found" })
    }

    return res.json({
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
    console.error("Error fetching news:", error)
    return res.status(500).json({ error: "Failed to fetch news" })
  }
}

