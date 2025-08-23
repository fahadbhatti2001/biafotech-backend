import { Request, Response } from "express"

export const main = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({
      title: "Success",
      message: "The app is working properly!",
    })
  } catch (error) {
    console.error("Health check error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
