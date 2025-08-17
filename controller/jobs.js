import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Helper function to transform job for API responses (matching frontend types)
const transformJobForResponse = (job) => {
  const transformed = {
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    qualifications: job.qualifications || [],
    jobInformation: {
      title: job.title,
      description: job.description,
      salary: job.salary || "",
      dateOpened: job.dateOpened?.toISOString() || job.createdAt?.toISOString(),
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
const transformJobToCardData = (job) => ({
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
const transformJobTypeForDB = (type) => {
  return type.toUpperCase().replace("-", "_") // full-time -> FULL_TIME
}

// Helper function to transform application status for API responses
const transformApplicationForResponse = (application) => ({
  ...application,
  status: application.status.toLowerCase(), // PENDING -> pending
  createdAt: application.createdAt.toISOString(),
  updatedAt: application.updatedAt.toISOString(),
})

// Helper function to transform application status for database storage
const transformApplicationStatusForDB = (status) => {
  return status.toUpperCase() // pending -> PENDING
}

// GET /jobs - Fetch all jobs with optional filters and pagination
export const getAllJobs = async (req, res, err) => {
  try {
    const {
      pageNumber = 1,
      limit = 10,
      order = "DESC",
      orderBy = "createdAt",
      category,
      location,
      type,
      city,
      state,
      country,
      workExperience,
      search,
    } = req.query

    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause for filtering
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { location: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(type && { type: transformJobTypeForDB(type) }),
      ...(location && {
        location: { contains: location, mode: "insensitive" },
      }),
    }

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where })

    // Get jobs with pagination and ordering
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    const transformedJobs = jobs.map((job) => transformJobForResponse(job))

    return res.json({
      count: totalCount,
      rows: transformedJobs,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(totalCount / take),
        limit: take,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return res.status(500).json({ error: "Failed to fetch jobs" })
  }
}

// GET /jobs/:id - Fetch single job by ID
export const getJobById = async (req, res, err) => {
  try {
    const { id } = req.params
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    const transformedJob = transformJobForResponse(job)

    return res.json(transformedJob)
  } catch (error) {
    console.error("Error fetching job:", error)
    return res.status(500).json({ error: "Failed to fetch job" })
  }
}

// POST /jobs - Create new job
export const createJob = async (req, res) => {
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

    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary: salary || null,
        jobType: transformJobTypeForDB(jobType),
        workExperience,
        city,
        state,
        country,
        zipCode: zipCode || null,
        requirements,
        qualifications,
        createdBy: parseInt(createdBy),
        responsibilities: {
          create: responsibilities.map((resp, index) => ({
            title: resp.title,
            points: resp.points || [],
            order: index,
          })),
        },
      },
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
      },
    })

    return res.status(201).json(job)
  } catch (error) {
    console.error("Error creating job:", error)
    return res.status(500).json({ error: "Failed to create job" })
  }
}

// PUT /jobs/:id - Update existing job
export const updateJob = async (req, res, err) => {
  try {
    const { id } = req.params
    const {
      jobInformation = {},
      responsibilities,
      requirements,
      qualifications,
      isActive,
    } = req.body

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Build update data object from jobInformation
    const updateData = {
      ...(jobInformation.title && { title: jobInformation.title }),
      ...(jobInformation.description && {
        description: jobInformation.description,
      }),
      ...(jobInformation.salary !== undefined && {
        salary: jobInformation.salary,
      }),
      ...(jobInformation.jobType && {
        jobType: transformJobTypeForDB(jobInformation.jobType),
      }),
      ...(jobInformation.workExperience && {
        workExperience: jobInformation.workExperience,
      }),
      ...(jobInformation.city && { city: jobInformation.city }),
      ...(jobInformation.state && { state: jobInformation.state }),
      ...(jobInformation.country && { country: jobInformation.country }),
      ...(jobInformation.zipCode !== undefined && {
        zipCode: jobInformation.zipCode,
      }),
      ...(requirements && { requirements }),
      ...(qualifications && { qualifications }),
      ...(isActive !== undefined && { isActive }),
    }

    // Handle responsibilities update if provided
    if (responsibilities !== undefined) {
      // Delete existing responsibilities and create new ones
      await prisma.jobResponsibility.deleteMany({
        where: { jobId: parseInt(id) },
      })

      updateData.responsibilities = {
        create: responsibilities.map((resp, index) => ({
          title: resp.title,
          points: resp.points,
          order: index,
        })),
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        responsibilities: {
          orderBy: { order: "asc" },
        },
      },
    })

    return res.json(transformJobForResponse(updatedJob))
  } catch (error) {
    console.error("Error updating job:", error)
    return res.status(500).json({ error: "Failed to update job" })
  }
}

// DELETE /jobs/:id - Delete job
export const deleteJob = async (req, res, err) => {
  try {
    const { id } = req.params

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Soft delete by setting isActive to false instead of hard delete
    // This preserves applications and data integrity
    await prisma.job.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    })

    return res.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Error deleting job:", error)
    return res.status(500).json({ error: "Failed to delete job" })
  }
}

// POST /jobs/:id/apply - Apply to a job
export const applyToJob = async (req, res, err) => {
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
        resumeUrl,
        coverLetter,
      },
    })

    return res.status(201).json(transformApplicationForResponse(application))
  } catch (error) {
    console.error("Error applying to job:", error)
    return res.status(500).json({ error: "Failed to apply to job" })
  }
}

// GET /jobs/applications - Fetch job applications with filters
export const getJobApplications = async (req, res, err) => {
  try {
    const {
      pageNumber = 1,
      limit = 10,
      order = "DESC",
      orderBy = "createdAt",
      jobId,
      status,
    } = req.query

    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause for filtering
    const where = {
      ...(jobId && { jobId: parseInt(jobId) }),
      ...(status && { status: transformApplicationStatusForDB(status) }),
    }

    const applications = await prisma.jobApplication.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
          },
        },
      },
    })

    const transformedApplications = applications.map((app) => ({
      ...transformApplicationForResponse(app),
      job: app.job
        ? {
            ...app.job,
            type: app.job.type.toLowerCase().replace("_", "-"),
          }
        : null,
    }))

    return res.json(transformedApplications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return res.status(500).json({ error: "Failed to fetch applications" })
  }
}

// PUT /jobs/applications/:id/status - Update application status
export const updateApplicationStatus = async (req, res, err) => {
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
      data: { status: transformApplicationStatusForDB(status) },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
          },
        },
      },
    })

    const transformedApplication = {
      ...transformApplicationForResponse(updatedApplication),
      job: updatedApplication.job
        ? {
            ...updatedApplication.job,
            type: updatedApplication.job.type.toLowerCase().replace("_", "-"),
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

// GET /jobs/cards - Fetch jobs in JobCardData format for frontend display
export const getJobsAsCards = async (req, res, err) => {
  try {
    const {
      pageNumber = 1,
      limit = 10,
      order = "DESC",
      orderBy = "createdAt",
      type,
      city,
      state,
      country,
      workExperience,
      search,
    } = req.query

    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Build where clause for filtering
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { state: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(type && { jobType: transformJobTypeForDB(type) }),
      ...(city && { city: { contains: city, mode: "insensitive" } }),
      ...(state && { state: { contains: state, mode: "insensitive" } }),
      ...(country && { country: { contains: country, mode: "insensitive" } }),
      ...(workExperience && {
        workExperience: { contains: workExperience, mode: "insensitive" },
      }),
    }

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where })

    // Get jobs with pagination and ordering
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
    })

    const jobCards = jobs.map((job) => transformJobToCardData(job))

    return res.json({
      count: totalCount,
      rows: jobCards,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(totalCount / take),
        limit: take,
        totalCount,
      },
    })
  } catch (error) {
    console.error("Error fetching job cards:", error)
    return res.status(500).json({ error: "Failed to fetch job cards" })
  }
}
