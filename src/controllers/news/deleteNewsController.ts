import { Request, Response } from "express"
import { News } from "../../models/index.js"

// DELETE /news/:id - Delete news
export const deleteNews = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params

    // Check if news exists
    const existingNews = await News.findByPk(parseInt(id))

    if (!existingNews) {
      return res.status(404).json({ error: "News not found" })
    }

    // Delete news
    await existingNews.destroy()

    return res.json({ message: "News deleted successfully" })
  } catch (error) {
    console.error("Error deleting news:", error)
    return res.status(500).json({ error: "Failed to delete news" })
  }
}

