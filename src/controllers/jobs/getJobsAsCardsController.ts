import { Request, Response } from "express"
import { Op } from "sequelize"
import { Job, JobResponsibility, JobType } from "../../models/index.js"
import {
  transformJobForResponse,
  transformJobTypeForDB,
} from "../../utils/jobTransformers.js"
import {
  JobsQuery,
  PaginationResponse,
  TransformedJob,
  JobWithResponsibilities,
} from "../../types/index.js"

// GET /jobs/cards - Fetch jobs with full data for frontend display
export const getJobsAsCards = async (
  req: Request<{}, PaginationResponse<TransformedJob>, {}, JobsQuery>,
  res: Response,
): Promise<Response> => {
  try {
    const {
      pageNumber = "1",
      limit = "10",
      order = "DESC",
      orderBy = "createdAt",
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
        { state: { [Op.iLike]: `%${search}%` } },
      ]
    }

    if (type) {
      where.jobType = transformJobTypeForDB(type) as JobType
    }

    if (city) {
      where.city = { [Op.iLike]: `%${city}%` }
    }

    if (state) {
      where.state = { [Op.iLike]: `%${state}%` }
    }

    if (country) {
      where.country = { [Op.iLike]: `%${country}%` }
    }

    if (workExperience) {
      where.workExperience = { [Op.iLike]: `%${workExperience}%` }
    }

    // Get total count for pagination
    const totalCount = await Job.count({ where })

    // Get jobs with pagination, ordering, and include relationships
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
      return transformJobForResponse(jobData as JobWithResponsibilities)
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
    console.error("Error fetching jobs with full data:", error)
    return res
      .status(500)
      .json({ error: "Failed to fetch jobs with full data" })
  }
}
