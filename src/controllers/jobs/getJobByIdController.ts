import { Request, Response } from "express"
import { Job, JobResponsibility } from "../../models/index.js"
import { transformJobForResponse } from "../../utils/jobTransformers.js"
import { TransformedJob } from "../../types/index.js"

// GET /jobs/:id - Fetch single job by ID
export const getJobById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const job = await Job.findByPk(parseInt(id), {
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

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    const jobData: any = job.toJSON()
    jobData._count = { applications: parseInt(jobData.applicationsCount) || 0 }
    const transformedJob = transformJobForResponse(jobData)

    return res.json(transformedJob)
  } catch (error) {
    console.error("Error fetching job:", error)
    return res.status(500).json({ error: "Failed to fetch job" })
  }
}
