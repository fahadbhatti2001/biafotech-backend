# API Documentation

This document lists all available APIs for Jobs, Job Applications, News, and Portfolio.

**Base URL:** `process.env.NEXT_PUBLIC_BASE_URL`

**Authentication:** All endpoints (except public ones) require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Table of Contents

1. [Jobs APIs](#jobs-apis)
2. [Job Application APIs](#job-application-apis)
3. [News APIs](#news-apis)
4. [Portfolio APIs](#portfolio-apis)

---

## Jobs APIs

### 1. Get All Jobs

**Endpoint:** `GET /jobs`

**Description:** Fetch paginated list of jobs with optional filters

**Query Parameters:**
- `pageNumber` (number, optional): Page number for pagination
- `limit` (number, optional): Number of items per page
- `order` (string, optional): Sort order - "ASC" or "DESC"
- `orderBy` (string, optional): Field to sort by
- `search` (string, optional): Search term
- `category` (string, optional): Filter by category
- `location` (string, optional): Filter by location
- `type` (string, optional): Filter by job type (full-time, part-time, contract, internship)
- `city` (string, optional): Filter by city
- `state` (string, optional): Filter by state
- `country` (string, optional): Filter by country
- `workExperience` (string, optional): Filter by work experience

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "count": 10,
    "rows": [
      {
        "id": 1,
        "title": "Software Engineer",
        "description": "Job description...",
        "location": "Lahore, Punjab",
        "type": "full-time",
        "salary": "200000",
        "requirements": ["requirement1", "requirement2"],
        "benefits": ["benefit1", "benefit2"],
        "createdBy": 1,
        "isActive": true,
        "createdAt": "2025-01-19T17:12:17.917Z",
        "updatedAt": "2025-01-19T17:12:30.660Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "limit": 10,
      "totalCount": 10
    }
  }
}
```

**Service Function:** `fetchJobsData()`

**React Hook:** `useJobs()`

---

### 2. Get Job Cards

**Endpoint:** `GET /jobs/cards`

**Description:** Fetch simplified job cards for display (lighter data structure)

**Query Parameters:** Same as Get All Jobs

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "title": "Software Engineer",
      "location": "Lahore, Punjab",
      "description": "Job description...",
      "type": "full-time",
      "time": "3-5 Years"
    }
  ]
}
```

**Service Function:** `fetchJobCardsData()`

**React Hook:** `useJobCards()`

---

### 3. Get Job by ID

**Endpoint:** `GET /jobs/:id`

**Description:** Fetch a single job by its ID

**Path Parameters:**
- `id` (string, required): Job ID

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "id": 1,
    "title": "Software Engineer",
    "description": "Job description...",
    "location": "Lahore, Punjab",
    "type": "full-time",
    "salary": "200000",
    "requirements": ["requirement1", "requirement2"],
    "benefits": ["benefit1", "benefit2"],
    "responsibilities": [
      {
        "id": 3,
        "title": "Development",
        "points": ["point1", "point2"],
        "order": 0
      }
    ],
    "qualifications": ["qualification1"],
    "jobInformation": {
      "title": "Software Engineer",
      "description": "Job description...",
      "salary": "200000",
      "dateOpened": "2025-01-19T17:12:17.916Z",
      "jobType": "full-time",
      "workExperience": "Mid Level (3-5 years)",
      "city": "Lahore",
      "state": "Lahore",
      "country": "Pakistan",
      "zipCode": "54000"
    },
    "createdBy": 1,
    "isActive": true,
    "createdAt": "2025-01-19T17:12:17.917Z",
    "updatedAt": "2025-01-19T17:12:30.660Z"
  }
}
```

**Service Function:** `fetchJobByIdData()`

**React Hook:** `useJobById()`

---

### 4. Create Job

**Endpoint:** `POST /jobs`

**Description:** Create a new job posting

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Job description...",
  "jobType": "full-time",
  "workExperience": "Mid Level (3-5 years)",
  "city": "Lahore",
  "state": "Lahore",
  "country": "Pakistan",
  "salary": "200000",
  "zipCode": "54000",
  "responsibilities": [
    {
      "title": "Development",
      "points": ["Develop features", "Write tests"]
    }
  ],
  "requirements": ["requirement1", "requirement2"],
  "qualifications": ["qualification1", "qualification2"],
  "createdBy": 1
}
```

**Request Body Fields:**
- `title` (string, required): Job title
- `description` (string, required): Job description
- `jobType` (string, required): Job type - "full-time", "part-time", "contract", or "internship"
- `workExperience` (string, required): Work experience level (e.g., "Mid Level (3-5 years)")
- `city` (string, required): City name
- `state` (string, required): State/Province name
- `country` (string, required): Country name
- `salary` (string, optional): Salary information
- `zipCode` (string, required): Postal/ZIP code
- `responsibilities` (array, required): Array of responsibility objects with `title` and `points` array
- `requirements` (array, required): Array of requirement strings
- `qualifications` (array, required): Array of qualification strings
- `createdBy` (number, required): User ID of the creator

**Response:**
```json
{
  "status": true,
  "message": "Job created successfully",
  "data": {
    "id": 1,
    "title": "Software Engineer",
    ...
  }
}
```

**Service Function:** `createJobData()`

**React Hook:** `useCreateJob()`

---

### 5. Update Job

**Endpoint:** `PUT /jobs/:id`

**Description:** Update an existing job posting

**Path Parameters:**
- `id` (string, required): Job ID

**Request Body:** Same as Create Job

**Response:**
```json
{
  "status": true,
  "message": "Job updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Software Engineer",
    ...
  }
}
```

**Service Function:** `updateJobData()`

**React Hook:** `useUpdateJob()`

---

### 6. Delete Job

**Endpoint:** `DELETE /jobs/:id`

**Description:** Delete a job posting

**Path Parameters:**
- `id` (string, required): Job ID

**Response:**
```json
{
  "status": true,
  "message": "Job deleted successfully",
  "data": "Job deleted successfully"
}
```

**Service Function:** `deleteJobData()`

**React Hook:** `useDeleteJob()`

---

## Job Application APIs

### 1. Apply to Job

**Endpoint:** `POST /jobs/:jobId/apply`

**Description:** Submit a job application (requires file upload via FormData)

**Path Parameters:**
- `jobId` (string, required): Job ID to apply for

**Request Body (FormData - file upload required):**
- `applicantName` (string, required): Applicant's full name
- `applicantEmail` (string, required): Applicant's email
- `resume` (File, required): Resume file (PDF, DOC, DOCX, max 5MB)
- `coverLetter` (string, optional): Cover letter text

**Note:** 
- Use `multipart/form-data` content type (automatically set by axios when using FormData)
- The file field name must be `resume`
- Resume file upload is **required**

**Response:**
```json
{
  "status": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "jobId": 1,
    "applicantName": "John Doe",
    "applicantEmail": "john@example.com",
    "coverLetter": "Cover letter text...",
    "status": "pending",
    "createdAt": "2025-01-19T17:12:17.917Z",
    "updatedAt": "2025-01-19T17:12:17.917Z"
  }
}
```

**Service Function:** `applyToJobData()`

**React Hook:** `useApplyToJob()`

---

### 2. Get Job Applications

**Endpoint:** `GET /jobs/applications`

**Description:** Fetch job applications with optional filters

**Query Parameters:**
- `jobId` (number, optional): Filter by specific job ID
- `status` (string, optional): Filter by status (pending, reviewed, interview, rejected, hired)
- `pageNumber` (number, optional): Page number for pagination
- `limit` (number, optional): Number of items per page
- `order` (string, optional): Sort order - "ASC" or "DESC"
- `orderBy` (string, optional): Field to sort by

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "jobId": 1,
      "applicantName": "John Doe",
      "applicantEmail": "john@example.com",
      "coverLetter": "Cover letter text...",
      "status": "pending",
      "createdAt": "2025-01-19T17:12:17.917Z",
      "updatedAt": "2025-01-19T17:12:17.917Z"
    }
  ]
}
```

**Service Function:** `fetchJobApplicationsData()`

**React Hook:** `useJobApplications()`

---

### 3. Update Application Status

**Endpoint:** `PUT /jobs/applications/:id/status`

**Description:** Update the status of a job application

**Path Parameters:**
- `id` (string, required): Application ID

**Request Body:**
```json
{
  "status": "reviewed"
}
```

**Status Values:**
- `pending` - Application is pending review
- `reviewed` - Application has been reviewed
- `interview` - Applicant is scheduled for interview
- `rejected` - Application has been rejected
- `hired` - Applicant has been hired

**Response:**
```json
{
  "status": true,
  "message": "Application status updated successfully",
  "data": {
    "id": 1,
    "jobId": 1,
    "applicantName": "John Doe",
    "applicantEmail": "john@example.com",
    "coverLetter": "Cover letter text...",
    "status": "reviewed",
    "createdAt": "2025-01-19T17:12:17.917Z",
    "updatedAt": "2025-01-19T17:12:30.660Z"
  }
}
```

**Service Function:** `updateApplicationStatusData()`

**React Hook:** `useUpdateApplicationStatus()`

---

## News APIs

**Status:** ⚠️ Not yet implemented

**Note:** News APIs are planned but not yet implemented in the backend. The frontend components are ready and will use these endpoints when available.

### Planned Endpoints:

1. **Get All News**
   - `GET /news`
   - Query parameters: `pageNumber`, `limit`, `search`, `category`

2. **Get News by ID**
   - `GET /news/:id`

3. **Create News**
   - `POST /news`
   - Request body: `{ title, category, image, content, publishedAt }`
   - Supports file upload for image (FormData)

4. **Update News**
   - `PUT /news/:id`
   - Request body: Same as Create News

5. **Delete News**
   - `DELETE /news/:id`

**Expected News Item Structure:**
```typescript
interface NewsItem {
  id: number
  title: string
  category: string
  image: string
  content?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}
```

---

## Portfolio APIs

**Status:** ⚠️ Not yet implemented

**Note:** Portfolio APIs are planned but not yet implemented in the backend. The frontend components are ready and will use these endpoints when available.

### Planned Endpoints:

1. **Get All Portfolio Items**
   - `GET /portfolio`
   - Query parameters: `pageNumber`, `limit`, `search`, `category`

2. **Get Portfolio Item by ID**
   - `GET /portfolio/:id`

3. **Create Portfolio Item**
   - `POST /portfolio`
   - Request body: `{ title, client, category, description, image, technologies, projectUrl }`
   - Supports file upload for image (FormData)

4. **Update Portfolio Item**
   - `PUT /portfolio/:id`
   - Request body: Same as Create Portfolio Item

5. **Delete Portfolio Item**
   - `DELETE /portfolio/:id`

**Expected Portfolio Item Structure:**
```typescript
interface PortfolioItem {
  id: number
  title: string
  client: string
  category: string
  description: string
  image: string
  technologies: string[]
  projectUrl?: string
  createdAt: string
  updatedAt: string
}
```

---

## Error Responses

All APIs may return the following error responses:

**400 Bad Request:**
```json
{
  "status": false,
  "message": "Validation error message",
  "data": null
}
```

**401 Unauthorized:**
```json
{
  "status": false,
  "message": "Your session has expired. Kindly log in again to continue accessing your account.",
  "data": null
}
```

**404 Not Found:**
```json
{
  "status": false,
  "message": "Resource not found",
  "data": null
}
```

**500 Internal Server Error:**
```json
{
  "status": false,
  "message": "Internal server error",
  "data": null
}
```

---

## Implementation Notes

### File Uploads

When uploading files (resume, images), use `FormData`:

```javascript
const formData = new FormData()
formData.append('fieldName', file)
formData.append('otherField', 'value')

// Axios will automatically set Content-Type with boundary
await http.post('/endpoint', formData)
```

### Pagination

All list endpoints support pagination:
- `pageNumber`: 1-based page number
- `limit`: Items per page (default: 10)

### Filtering

Most list endpoints support filtering via query parameters. Multiple filters can be combined.

### Authentication

All endpoints require authentication except:
- Public job listings (if implemented)
- Health check endpoint

---

## Service Functions Location

- **Jobs:** `src/api/jobs/service.ts`
- **Job Applications:** `src/api/jobs/service.ts`
- **Dashboard:** `src/api/dashboard/service.ts`

## React Hooks Location

- **Jobs:** `src/api/jobs/useJobs.tsx`
- **Dashboard:** `src/api/dashboard/useDashboard.tsx`

---

**Last Updated:** January 2025

