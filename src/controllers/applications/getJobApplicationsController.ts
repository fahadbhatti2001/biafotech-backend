import { Request, Response } from "express"
import { Job, JobApplication, ApplicationStatus } from "../../models/index.js"
import {
  transformApplicationForResponse,
  transformApplicationStatusForDB,
} from "../../utils/applicationTransformers.js"
import { ApplicationsQuery } from "../../types/index.js"

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

    const offset = (parseInt(pageNumber) - 1) * parseInt(limit)
    const limitNum = parseInt(limit)

    // Build where clause for filtering
    const where: any = {}
    
    if (jobId) {
      where.jobId = parseInt(jobId)
    }
    
    if (status) {
      where.status = transformApplicationStatusForDB(status) as ApplicationStatus
    }

    const applications = await JobApplication.findAll({
      where,
      offset,
      limit: limitNum,
      order: [[orderBy, order.toUpperCase()]],
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "jobType"],
        },
      ],
    })

    const transformedApplications = applications.map((app: any) => {
      const appData = app.toJSON()
      const transformed = transformApplicationForResponse(appData)
      return {
        id: transformed.id,
        jobId: transformed.jobId,
        applicantName: transformed.applicantName,
        applicantEmail: transformed.applicantEmail,
        coverLetter: transformed.coverLetter,
        status: transformed.status,
        createdAt: transformed.createdAt,
        updatedAt: transformed.updatedAt,
      }
    })

    return res.json({
      status: true,
      message: "Success",
      data: transformedApplications,
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    })
  }
}
