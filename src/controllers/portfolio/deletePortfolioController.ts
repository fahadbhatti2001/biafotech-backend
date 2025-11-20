import { Request, Response } from "express"
import { Portfolio } from "../../models/index.js"

// DELETE /portfolio/:id - Delete portfolio item
export const deletePortfolio = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params

    // Check if portfolio exists
    const existingPortfolio = await Portfolio.findByPk(parseInt(id))

    if (!existingPortfolio) {
      return res.status(404).json({ error: "Portfolio item not found" })
    }

    // Delete portfolio
    await existingPortfolio.destroy()

    return res.json({ message: "Portfolio item deleted successfully" })
  } catch (error) {
    console.error("Error deleting portfolio:", error)
    return res.status(500).json({ error: "Failed to delete portfolio" })
  }
}

