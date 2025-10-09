import { JobApplication } from "../models/index.js"
import { TransformedApplication } from "../types/index.js"

// Helper function to transform application status for API responses
export const transformApplicationForResponse = (
  application: JobApplication | (JobApplication & { job?: any }),
): Omit<TransformedApplication, "job"> => ({
  id: application.id,
  jobId: application.jobId,
  applicantName: application.applicantName,
  applicantEmail: application.applicantEmail,
  resumeUrl: application.resumeUrl,
  coverLetter: application.coverLetter,
  status: application.status.toLowerCase(), // PENDING -> pending
  createdAt: application.createdAt.toISOString(),
  updatedAt: application.updatedAt.toISOString(),
})

// Helper function to transform application status for database storage
export const transformApplicationStatusForDB = (status: string): string => {
  return status.toUpperCase() // pending -> PENDING
}
