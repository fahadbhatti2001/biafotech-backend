import { Request, Response } from "express"
import { prisma } from "../../config/database.js"
import {
  transformApplicationForResponse,
  transformApplicationStatusForDB,
} from "../../utils/applicationTransformers.js"
import { ApplicationsQuery } from "../../types/index.js"
import { ApplicationStatus } from "@prisma/client"

// GET /jobs/applications - Fetch job applications with filters
export const getJobApplications = async (
  req: Request<{}, {}, {}, ApplicationsQuery>,
  res: Response,
): Promise<Response> => {
  try {
    const {
      pageNumber = "1",
      limit = "10",
      order = "DESC",
      orderBy = "createdAt",
      jobId,
      status,
    } = req.query

    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause for filtering
    const where: any = {
      ...(jobId && { jobId: parseInt(jobId) }),
      ...(status && {
        status: transformApplicationStatusForDB(status) as ApplicationStatus,
      }),
    }

    const applications = await prisma.jobApplication.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            jobType: true,
          },
        },
      },
    })

    const transformedApplications = applications.map((app) => ({
      ...transformApplicationForResponse(app),
      job: app.job
        ? {
            ...app.job,
            type: app.job.jobType.toLowerCase().replace("_", "-"),
          }
        : null,
    }))

    return res.json(transformedApplications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return res.status(500).json({ error: "Failed to fetch applications" })
  }
}
