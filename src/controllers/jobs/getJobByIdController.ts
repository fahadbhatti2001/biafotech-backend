import { Request, Response } from "express"
import { prisma } from "../../config/database.js"
import { transformJobForResponse } from "../../utils/jobTransformers.js"
import { TransformedJob } from "../../types/index.js"

// GET /jobs/:id - Fetch single job by ID
export const getJobById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    const transformedJob = transformJobForResponse(job)

    return res.json(transformedJob)
  } catch (error) {
    console.error("Error fetching job:", error)
    return res.status(500).json({ error: "Failed to fetch job" })
  }
}
