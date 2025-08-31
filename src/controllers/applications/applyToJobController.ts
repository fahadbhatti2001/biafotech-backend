import { Response } from "express"
import { prisma } from "../../config/database.js"
import { transformApplicationForResponse } from "../../utils"
import { JobApplicationRequest } from "../../types/index.js"

// POST /jobs/:id/apply - Apply to a job
export const applyToJob = async (
  req: JobApplicationRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id: jobId } = req.params
    const { applicantName, applicantEmail, resumeUrl, coverLetter } = req.body

    // Validate required fields
    if (!applicantName || !applicantEmail) {
      return res.status(400).json({
        error: "Missing required fields: applicantName, applicantEmail",
      })
    }

    // Check if job exists and is active
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    })

    if (!job || !job.isActive) {
      return res
        .status(404)
        .json({ error: "Job not found or no longer active" })
    }

    // Check if user already applied to this job
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId: parseInt(jobId),
        applicantEmail: applicantEmail,
      },
    })

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied to this job" })
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: parseInt(jobId),
        applicantName,
        applicantEmail,
        resumeUrl: resumeUrl || null,
        coverLetter: coverLetter || null,
      },
    })

    return res.status(201).json(transformApplicationForResponse(application))
  } catch (error) {
    console.error("Error applying to job:", error)
    return res.status(500).json({ error: "Failed to apply to job" })
  }
}
