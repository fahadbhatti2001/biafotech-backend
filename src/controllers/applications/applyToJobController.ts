import { Response } from "express"
import { Job, JobApplication } from "../../models/index.js"
import { transformApplicationForResponse } from "../../utils/applicationTransformers.js"
import { JobApplicationRequest } from "../../types/index.js"

// POST /jobs/:jobId/apply - Apply to a job
export const applyToJob = async (
  req: JobApplicationRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { jobId } = req.params
    const { applicantName, applicantEmail, resumeUrl, coverLetter } = req.body

    // Validate required fields
    if (!applicantName || !applicantEmail) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: applicantName, applicantEmail",
        data: null,
      })
    }

    // Check if job exists and is active
    const job = await Job.findByPk(parseInt(jobId))

    if (!job || !job.isActive) {
      return res.status(404).json({
        status: false,
        message: "Job not found or no longer active",
        data: null,
      })
    }

    // Check if user already applied to this job
    const existingApplication = await JobApplication.findOne({
      where: {
        jobId: parseInt(jobId),
        applicantEmail: applicantEmail,
      },
    })

    if (existingApplication) {
      return res.status(400).json({
        status: false,
        message: "You have already applied to this job",
        data: null,
      })
    }

    const application = await JobApplication.create({
      jobId: parseInt(jobId),
      applicantName,
      applicantEmail,
      resumeUrl: resumeUrl || null,
      coverLetter: coverLetter || null,
    })

    const transformed = transformApplicationForResponse(application)

    return res.status(201).json({
      status: true,
      message: "Application submitted successfully",
      data: {
        id: transformed.id,
        jobId: transformed.jobId,
        applicantName: transformed.applicantName,
        applicantEmail: transformed.applicantEmail,
        coverLetter: transformed.coverLetter,
        status: transformed.status,
        createdAt: transformed.createdAt,
        updatedAt: transformed.updatedAt,
      },
    })
  } catch (error) {
    console.error("Error applying to job:", error)
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    })
  }
}
