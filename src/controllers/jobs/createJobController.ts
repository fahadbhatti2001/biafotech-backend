import { Response } from "express"
import { Job, JobType, JobResponsibility } from "../../models/index.js"
import { transformJobTypeForDB } from "../../utils/jobTransformers.js"
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

    // Create job
    const job = await Job.create({
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
    })

    // Create responsibilities
    if (responsibilities.length > 0) {
      await JobResponsibility.bulkCreate(
        responsibilities.map((resp, index) => ({
          jobId: job.id,
          title: resp.title,
          points: resp.points || [],
          order: index,
        }))
      )
    }

    // Fetch job with responsibilities
    const jobWithResponsibilities = await Job.findByPk(job.id, {
      include: [
        {
          model: JobResponsibility,
          as: "responsibilities",
          attributes: ["id", "title", "points", "order"],
        },
      ],
      order: [[{ model: JobResponsibility, as: "responsibilities" }, "order", "ASC"]],
    })

    return res.status(201).json(jobWithResponsibilities)
  } catch (error) {
    console.error("Error creating job:", error)
    return res.status(500).json({ error: "Failed to create job" })
  }
}
