import { Job, Prisma } from "@prisma/client"
import {
  JobWithResponsibilities,
  TransformedJob,
  JobCardData,
} from "../types/index.js"

// Helper function to transform job for API responses (matching frontend types)
export const transformJobForResponse = (
  job: JobWithResponsibilities,
): TransformedJob => {
  const transformed: TransformedJob = {
    responsibilities: job.responsibilities || [],
    requirements: (job.requirements as Prisma.JsonValue) || [],
    qualifications: (job.qualifications as Prisma.JsonValue) || [],
    jobInformation: {
      title: job.title,
      description: job.description,
      salary: job.salary || "",
      dateOpened:
        job.dateOpened?.toISOString() || job.createdAt?.toISOString() || "",
      jobType: job.jobType.toLowerCase().replace("_", "-"), // FULL_TIME -> full-time
      workExperience: job.workExperience,
      city: job.city,
      state: job.state,
      country: job.country,
      zipCode: job.zipCode || "",
    },
  }

  // Add additional metadata
  if (job.id) transformed.id = job.id
  if (job.createdAt) transformed.createdAt = job.createdAt.toISOString()
  if (job.updatedAt) transformed.updatedAt = job.updatedAt.toISOString()
  if (job._count) transformed.applicationsCount = job._count.applications

  return transformed
}

// Helper function to transform job to JobCardData format
export const transformJobToCardData = (job: Job): JobCardData => ({
  id: job.id,
  title: job.title || "Job Title Not Available",
  location:
    [job.city, job.state].filter(Boolean).join(", ") ||
    "Location Not Specified",
  description: job.description || "No description available",
  type: job.jobType
    ? job.jobType.toLowerCase().replace("_", "-")
    : "Not Specified",
  time: job.workExperience || "Not Specified",
})

// Helper function to transform job type for database storage
export const transformJobTypeForDB = (type: string): string => {
  return type.toUpperCase().replace("-", "_") // full-time -> FULL_TIME
}
