import { Request, Response } from "express"
import { Job } from "../../models/index.js"

// DELETE /jobs/:id - Delete job
export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params

    // Check if job exists
    const existingJob = await Job.findByPk(parseInt(id))

    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Soft delete by setting isActive to false instead of hard delete
    // This preserves applications and data integrity
    await existingJob.update({ isActive: false })

    return res.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Error deleting job:", error)
    return res.status(500).json({ error: "Failed to delete job" })
  }
}
