import { Response } from "express"
import { Job, JobType, JobResponsibility } from "../../models/index.js"
import {
  transformJobForResponse,
  transformJobTypeForDB,
} from "../../utils/jobTransformers.js"
import { JobUpdateRequest } from "../../types/index.js"

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
    const existingJob = await Job.findByPk(parseInt(id))

    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Build update data object (only include fields that are provided)
    const updateData: any = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (salary !== undefined) updateData.salary = salary
    if (jobType) updateData.jobType = transformJobTypeForDB(jobType) as JobType
    if (workExperience) updateData.workExperience = workExperience
    if (city) updateData.city = city
    if (state) updateData.state = state
    if (country) updateData.country = country
    if (zipCode !== undefined) updateData.zipCode = zipCode
    if (requirements) updateData.requirements = requirements
    if (qualifications) updateData.qualifications = qualifications
    if (createdBy !== undefined) updateData.createdBy = parseInt(String(createdBy))

    // Update job
    await existingJob.update(updateData)

    // Handle responsibilities update if provided
    if (responsibilities !== undefined) {
      // Delete existing responsibilities
      await JobResponsibility.destroy({
        where: { jobId: parseInt(id) },
      })

      // Create new responsibilities
      if (responsibilities.length > 0) {
        await JobResponsibility.bulkCreate(
          responsibilities.map((resp, index) => ({
            jobId: parseInt(id),
            title: resp.title,
            points: resp.points,
            order: index,
          }))
        )
      }
    }

    // Fetch updated job with responsibilities
    const updatedJob = await Job.findByPk(parseInt(id), {
      include: [
        {
          model: JobResponsibility,
          as: "responsibilities",
          attributes: ["id", "title", "points", "order"],
        },
      ],
    })

    return res.json(transformJobForResponse(updatedJob!.toJSON() as any))
  } catch (error) {
    console.error("Error updating job:", error)
    return res.status(500).json({ error: "Failed to update job" })
  }
}
