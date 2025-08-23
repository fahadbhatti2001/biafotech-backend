import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Response } from "express"
import { prisma } from "../../config/database.js"
import { AuthRequest } from "../../types/index.js"

export const login = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required fields: email, password",
      })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "Invalid email or password",
      })
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "24h",
      },
    )

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role.toLowerCase(),
        createdAt: user.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error during login:", error)
    return res.status(500).json({ error: "Failed to login" })
  }
}
