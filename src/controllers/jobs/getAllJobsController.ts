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
} from "../../types/index.js"
import { Prisma, JobType } from "@prisma/client"

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
        ],
      }),
      ...(type && { jobType: transformJobTypeForDB(type) as JobType }),
      ...(location && {
        city: { contains: location, mode: Prisma.QueryMode.insensitive },
      }),
    }

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where })

    // Get jobs with pagination and ordering
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() === "desc" ? "desc" : "asc" },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    const transformedJobs = jobs.map((job) => transformJobForResponse(job))

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
    console.error("Error fetching jobs:", error)
    return res.status(500).json({ error: "Failed to fetch jobs" })
  }
}
