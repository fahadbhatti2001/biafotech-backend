import { Response } from "express"
import { prisma } from "../../config/database.js"
import {
  transformApplicationForResponse,
  transformApplicationStatusForDB,
} from "../../utils"
import { ApplicationStatusRequest } from "../../types/index.js"
import { ApplicationStatus } from "@prisma/client"

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
    const existingApplication = await prisma.jobApplication.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingApplication) {
      return res.status(404).json({ error: "Application not found" })
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id: parseInt(id) },
      data: {
        status: transformApplicationStatusForDB(status) as ApplicationStatus,
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            jobType: true,
          },
        },
      },
    })

    const transformedApplication = {
      ...transformApplicationForResponse(updatedApplication),
      job: updatedApplication.job
        ? {
            ...updatedApplication.job,
            type: updatedApplication.job.jobType
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
