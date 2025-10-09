import { Request, Response } from "express"
import { Op } from "sequelize"
import { Job, JobResponsibility, JobApplication, JobType } from "../../models/index.js"
import {
  transformJobForResponse,
  transformJobTypeForDB,
} from "../../utils/jobTransformers.js"
import {
  JobsQuery,
  PaginationResponse,
  TransformedJob,
} from "../../types/index.js"

// GET /jobs - Fetch all jobs with optional filters and pagination
export const getAllJobs = async (
  req: Request<{}, PaginationResponse<TransformedJob>, {}, JobsQuery>,
  res: Response,
): Promise<Response> => {
  try {
    const {
      pageNumber = "1",
      limit = "10",
      order = "DESC",
      orderBy = "createdAt",
      category,
      location,
      type,
      city,
      state,
      country,
      workExperience,
      search,
    } = req.query

    const offset = (parseInt(pageNumber) - 1) * parseInt(limit)
    const limitNum = parseInt(limit)

    // Build where clause for filtering
    const where: any = {
      isActive: true,
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } },
      ]
    }

    if (type) {
      where.jobType = transformJobTypeForDB(type) as JobType
    }

    if (location) {
      where.city = { [Op.iLike]: `%${location}%` }
    }

    // Get total count for pagination
    const totalCount = await Job.count({ where })

    // Get jobs with pagination and ordering
    const jobs = await Job.findAll({
      where,
      offset,
      limit: limitNum,
      order: [[orderBy, order.toUpperCase()]],
      include: [
        {
          model: JobResponsibility,
          as: "responsibilities",
          attributes: ["id", "title", "points", "order"],
        },
      ],
      attributes: {
        include: [
          [
            // Add applications count
            Job.sequelize!.literal(`(
              SELECT COUNT(*)
              FROM "JobApplication"
              WHERE "JobApplication"."jobId" = "Job"."id"
            )`),
            "applicationsCount"
          ]
        ]
      }
    })

    const transformedJobs = jobs.map((job: any) => {
      const jobData = job.toJSON()
      jobData._count = { applications: parseInt(jobData.applicationsCount) || 0 }
      return transformJobForResponse(jobData)
    })

    return res.json({
      count: totalCount,
      rows: transformedJobs,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(totalCount / limitNum),
        limit: limitNum,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return res.status(500).json({ error: "Failed to fetch jobs" })
  }
}
