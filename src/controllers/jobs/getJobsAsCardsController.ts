import { Request, Response } from "express"
import { prisma } from "../../config/database.js"
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
import { Prisma, JobType } from "@prisma/client"

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

    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause for filtering
    const where: Prisma.JobWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          { city: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { state: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(type && { jobType: transformJobTypeForDB(type) as JobType }),
      ...(city && {
        city: { contains: city, mode: Prisma.QueryMode.insensitive },
      }),
      ...(state && {
        state: { contains: state, mode: Prisma.QueryMode.insensitive },
      }),
      ...(country && {
        country: { contains: country, mode: Prisma.QueryMode.insensitive },
      }),
      ...(workExperience && {
        workExperience: {
          contains: workExperience,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    }

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where })

    // Get jobs with pagination, ordering, and include relationships
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    })

    const transformedJobs = jobs.map((job) =>
      transformJobForResponse(job as JobWithResponsibilities),
    )

    return res.json({
      count: totalCount,
      rows: transformedJobs,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(totalCount / take),
        limit: take,
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
