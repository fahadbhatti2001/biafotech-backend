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
      return res.status(400).json({ error: "Status is required" })
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
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      })
    }

    // Check if application exists
    const existingApplication = await JobApplication.findByPk(parseInt(id))

    if (!existingApplication) {
      return res.status(404).json({ error: "Application not found" })
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
    const transformedApplication = {
      ...transformApplicationForResponse(appData),
      job: appData.job
        ? {
            ...appData.job,
            type: appData.job.jobType
              .toLowerCase()
              .replace("_", "-"),
          }
        : null,
    }

    return res.json(transformedApplication)
  } catch (error) {
    console.error("Error updating application status:", error)
    return res
      .status(500)
      .json({ error: "Failed to update application status" })
  }
}
