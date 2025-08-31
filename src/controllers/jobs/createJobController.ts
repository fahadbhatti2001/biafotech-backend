import { Response } from "express"
import { Job, JobType } from "@prisma/client"
import { prisma } from "../../config/database.js"
import { transformJobTypeForDB } from "../../utils"
import { JobCreateRequest } from "../../types/index.js"

// POST /jobs - Create new job
export const createJob = async (
  req: JobCreateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const {
      title,
      description,
      salary,
      jobType,
      workExperience,
      city,
      state,
      country,
      zipCode,
      responsibilities = [],
      requirements = [],
      qualifications = [],
      createdBy = 1,
    } = req.body

    // Validate required fields
    if (
      !title ||
      !description ||
      !jobType ||
      !workExperience ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: title, description, jobType, workExperience, city, state, country",
      })
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary: salary || null,
        jobType: transformJobTypeForDB(jobType) as JobType,
        workExperience,
        city,
        state,
        country,
        zipCode: zipCode || null,
        requirements,
        qualifications,
        createdBy: parseInt(String(createdBy)),
        responsibilities: {
          create: responsibilities.map((resp, index) => ({
            title: resp.title,
            points: resp.points || [],
            order: index,
          })),
        },
      },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
      },
    })

    return res.status(201).json(job)
  } catch (error) {
    console.error("Error creating job:", error)
    return res.status(500).json({ error: "Failed to create job" })
  }
}
