import { Request, Response } from "express"
import { Job, JobApplication, JobResponsibility } from "../models/index.js"

// Database types
export interface JobWithResponsibilities extends Job {
  responsibilities?: JobResponsibility[]
  _count?: {
    applications: number
  }
}

export interface ApplicationWithJob extends JobApplication {
  job?: {
    id: number
    title: string
    type: string
  }
}

// API Request/Response types
export interface AuthRequest extends Request {
  body: {
    email: string
    password: string
  }
}

export interface JobCreateRequest extends Request {
  body: {
    title: string
    description: string
    salary?: string
    jobType: string
    workExperience: string
    city: string
    state: string
    country: string
    zipCode?: string
    responsibilities?: Array<{
      title: string
      points: string[]
    }>
    requirements?: string[]
    qualifications?: string[]
    createdBy?: number
  }
}

export interface JobUpdateRequest extends Request {
  params: {
    id: string
  }
  body: {
    title?: string
    description?: string
    salary?: string
    jobType?: string
    workExperience?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
    responsibilities?: Array<{
      title: string
      points: string[]
    }>
    requirements?: string[]
    qualifications?: string[]
    createdBy?: number
  }
}

export interface JobApplicationRequest extends Request {
  params: {
    jobId: string
  }
  body: {
    applicantName: string
    applicantEmail: string
    resumeUrl?: string
    coverLetter?: string
  }
}

export interface ApplicationStatusRequest extends Request {
  params: {
    id: string
  }
  body: {
    status: "pending" | "reviewed" | "interview" | "rejected" | "hired"
  }
}

// Query parameter types
export interface JobsQuery {
  pageNumber?: string
  limit?: string
  order?: "ASC" | "DESC"
  orderBy?: string
  category?: string
  location?: string
  type?: string
  city?: string
  state?: string
  country?: string
  workExperience?: string
  search?: string
}

export interface ApplicationsQuery {
  pageNumber?: string
  limit?: string
  order?: "ASC" | "DESC"
  orderBy?: string
  jobId?: string
  status?: string
}

// Transformed response types
export interface TransformedJob {
  id?: number
  responsibilities?: JobResponsibility[]
  requirements: string[]
  qualifications: string[]
  jobInformation: {
    title: string
    description: string
    salary: string
    dateOpened: string
    jobType: string
    workExperience: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  createdAt?: string
  updatedAt?: string
  applicationsCount?: number
}

export interface JobCardData {
  id: number
  title: string
  location: string
  description: string
  type: string
  time: string
}

export interface TransformedApplication {
  id: number
  jobId: number
  applicantName: string
  applicantEmail: string
  resumeUrl: string | null
  coverLetter: string | null
  status: string
  createdAt: string
  updatedAt: string
  job?: {
    id: number
    title: string
    type: string
  }
}

export interface PaginationResponse<T> {
  count: number
  rows: T[]
  pagination: {
    currentPage: number
    totalPages: number
    limit: number
    totalCount: number
  }
}

// Controller function types
export type ControllerFunction<TRequest extends Request = Request> = (
  req: TRequest,
  res: Response,
  next?: any,
) => Promise<Response | void>

// Environment variables
export interface EnvConfig {
  NODE_ENV: string
  PORT: string
  DATABASE_URL: string
  JWT_SECRET: string
}
