import { Request, Response } from "express"
import { prisma } from "../config/database.js"
import {
  transformJobToCardData,
  transformJobTypeForDB,
} from "../utils/jobTransformers.js"
import { JobsQuery, PaginationResponse, JobCardData } from "../types/index.js"
import { Prisma, JobType } from "@prisma/client"

// GET /jobs/cards - Fetch jobs in JobCardData format for frontend display
export const getJobsAsCards = async (
  req: Request<{}, PaginationResponse<JobCardData>, {}, JobsQuery>,
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

    // Get jobs with pagination and ordering
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
    })

    const jobCards = jobs.map((job) => transformJobToCardData(job))

    return res.json({
      count: totalCount,
      rows: jobCards,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(totalCount / take),
        limit: take,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching job cards:", error)
    return res.status(500).json({ error: "Failed to fetch job cards" })
  }
}
