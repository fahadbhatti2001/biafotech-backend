import { Response } from "express"
import { Job, JobApplication, ApplicationStatus } from "../../models/index.js"
import {
  transformApplicationForResponse,
  transformApplicationStatusForDB,
} from "../../utils/applicationTransformers.js"
import { ApplicationStatusRequest } from "../../types/index.js"

// PUT /jobs/applications/:id/status - Update application status
export const updateApplicationStatus = async (
  req: ApplicationStatusRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status is required",
        data: null,
      })
    }

    const validStatuses = [
      "pending",
      "reviewed",
      "interview",
      "rejected",
      "hired",
    ]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        data: null,
      })
    }

    // Check if application exists
    const existingApplication = await JobApplication.findByPk(parseInt(id))

    if (!existingApplication) {
      return res.status(404).json({
        status: false,
        message: "Application not found",
        data: null,
      })
    }

    // Update application
    await existingApplication.update({
      status: transformApplicationStatusForDB(status) as ApplicationStatus,
    })

    // Fetch updated application with job details
    const updatedApplication = await JobApplication.findByPk(parseInt(id), {
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "jobType"],
        },
      ],
    })

    const appData: any = updatedApplication!.toJSON()
    const transformed = transformApplicationForResponse(appData)

    return res.json({
      status: true,
      message: "Application status updated successfully",
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
    console.error("Error updating application status:", error)
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    })
  }
}
