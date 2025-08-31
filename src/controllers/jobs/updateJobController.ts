import { Response } from "express"
import { prisma } from "../../config/database.js"
import { transformJobForResponse, transformJobTypeForDB } from "../../utils"
import { JobUpdateRequest } from "../../types/index.js"
import { JobType, Prisma } from "@prisma/client"

// PUT /jobs/:id - Update existing job
export const updateJob = async (
  req: JobUpdateRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
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
      responsibilities,
      requirements,
      qualifications,
      createdBy,
    } = req.body

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Build update data object (only include fields that are provided)
    const updateData: any = {
      ...(title && { title }),
      ...(description && { description }),
      ...(salary !== undefined && { salary }),
      ...(jobType && {
        jobType: transformJobTypeForDB(jobType) as JobType,
      }),
      ...(workExperience && { workExperience }),
      ...(city && { city }),
      ...(state && { state }),
      ...(country && { country }),
      ...(zipCode !== undefined && { zipCode }),
      ...(requirements && { requirements }),
      ...(qualifications && { qualifications }),
      ...(createdBy !== undefined && { createdBy: parseInt(String(createdBy)) }),
    }

    // Handle responsibilities update if provided
    if (responsibilities !== undefined) {
      // Delete existing responsibilities and create new ones
      await prisma.jobResponsibility.deleteMany({
        where: { jobId: parseInt(id) },
      })

      updateData.responsibilities = {
        create: responsibilities.map((resp, index) => ({
          title: resp.title,
          points: resp.points,
          order: index,
        })),
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
      },
    })

    return res.json(transformJobForResponse(updatedJob as any))
  } catch (error) {
    console.error("Error updating job:", error)
    return res.status(500).json({ error: "Failed to update job" })
  }
}
