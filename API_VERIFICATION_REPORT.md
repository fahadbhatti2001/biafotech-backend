# API Documentation Deep Scan Report

## 🔴 CRITICAL ISSUES - Response Format Wrapper

**ALL ENDPOINTS** - Documentation shows incorrect response wrapper:
- ❌ Documented: `{ status: boolean, message: string, data: any }`
- ✅ Actual: Direct data objects (no wrapper)

**Exception:** Error responses use `{ error: string }` format (not documented format)

---

## 📋 DETAILED FIELD-BY-FIELD ANALYSIS

### 1. GET /jobs (Get All Jobs)

#### Query Parameters Issues:
- ❌ `pageNumber` - Documented as `number`, but **ACTUAL is `string`** (query params are strings)
- ❌ `limit` - Documented as `number`, but **ACTUAL is `string`**
- ❌ `category` - Documented but **NOT IMPLEMENTED** in controller (no filtering logic)
- ✅ `location` - Implemented (filters by city)
- ✅ `type` - Implemented (filters by jobType)
- ✅ All other params match

#### Response Structure Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Wrong structure**: Response is direct object, not wrapped

#### Response Fields - GET /jobs:
**Documented (WRONG):**
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "count": 10,
    "rows": [
      {
        "id": 1,
        "title": "Software Engineer",  // ❌ WRONG - not at root
        "description": "...",           // ❌ WRONG - not at root
        "location": "Lahore, Punjab",   // ❌ WRONG - doesn't exist
        "type": "full-time",             // ❌ WRONG - doesn't exist
        "salary": "200000",              // ❌ WRONG - not at root
        "benefits": [...],               // ❌ WRONG - doesn't exist
        "createdBy": 1,                 // ❌ WRONG - not in response
        "isActive": true                 // ❌ WRONG - not in response
      }
    ]
  }
}
```

**Actual Response:**
```json
{
  "count": 10,
  "rows": [
    {
      "id": 1,
      "responsibilities": [...],         // ✅ Present
      "requirements": [...],             // ✅ Present
      "qualifications": [...],           // ✅ Present
      "jobInformation": {                // ✅ Present (nested object)
        "title": "Software Engineer",
        "description": "...",
        "salary": "200000",
        "dateOpened": "2025-01-19T...",
        "jobType": "full-time",
        "workExperience": "3-5 Years",
        "city": "Lahore",
        "state": "Punjab",
        "country": "Pakistan",
        "zipCode": "54000"
      },
      "createdAt": "2025-01-19T...",    // ✅ Present
      "updatedAt": "2025-01-19T...",    // ✅ Present
      "applicationsCount": 5             // ✅ Present (missing in docs)
    }
  ],
  "pagination": {...}                   // ✅ Present
}
```

**Missing Fields in Documentation:**
- `responsibilities` (array)
- `requirements` (array)
- `qualifications` (array)
- `jobInformation` (object with nested fields)
- `applicationsCount` (number)

**Wrong Fields in Documentation:**
- `title` (should be in `jobInformation.title`)
- `description` (should be in `jobInformation.description`)
- `location` (doesn't exist - should use `jobInformation.city`, `state`, `country`)
- `type` (should be `jobInformation.jobType`)
- `salary` (should be in `jobInformation.salary`)
- `benefits` (doesn't exist in model)
- `createdBy` (not returned in transformed response)
- `isActive` (not returned in transformed response)

---

### 2. GET /jobs/cards (Get Job Cards)

#### Response Structure Issues:
- ❌ **Wrong structure**: Documented as simple array, but **ACTUAL is paginated object** (same as GET /jobs)
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper

**Documented (WRONG):**
```json
{
  "status": true,
  "message": "Success",
  "data": [  // ❌ Should be paginated object
    {
      "id": 1,
      "title": "...",
      "location": "...",
      "description": "...",
      "type": "...",
      "time": "..."
    }
  ]
}
```

**Actual Response:**
```json
{
  "count": 10,
  "rows": [  // ✅ Same structure as GET /jobs
    {
      "id": 1,
      "responsibilities": [...],
      "requirements": [...],
      "qualifications": [...],
      "jobInformation": {
        "title": "...",
        "description": "...",
        "jobType": "full-time",
        "workExperience": "3-5 Years",
        "city": "Lahore",
        "state": "Punjab",
        "country": "Pakistan",
        ...
      },
      "applicationsCount": 5
    }
  ],
  "pagination": {...}
}
```

**Note:** This endpoint returns **FULL job data**, not simplified card format!

---

### 3. GET /jobs/:id (Get Job by ID)

#### Response Structure Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Wrong fields**: Same issues as GET /jobs

**Documented Response Issues:**
- ❌ `title`, `description`, `location`, `type`, `salary` at root (should be in `jobInformation`)
- ❌ `benefits` field (doesn't exist)
- ❌ `createdBy`, `isActive` (not in transformed response)
- ✅ `responsibilities` (correct)
- ✅ `qualifications` (correct)
- ✅ `jobInformation` structure (correct)
- ❌ Missing `applicationsCount` field

**Actual Response:**
```json
{
  "id": 1,
  "responsibilities": [...],
  "requirements": [...],
  "qualifications": [...],
  "jobInformation": {
    "title": "...",
    "description": "...",
    "salary": "...",
    "dateOpened": "...",
    "jobType": "full-time",
    "workExperience": "...",
    "city": "...",
    "state": "...",
    "country": "...",
    "zipCode": "..."
  },
  "createdAt": "...",
  "updatedAt": "...",
  "applicationsCount": 5  // ✅ Missing in docs
}
```

---

### 4. POST /jobs (Create Job)

#### Request Body Issues:

**Field Requirements:**
- ❌ `zipCode` - Documented as **required**, but **ACTUAL is optional** (line 38 in types: `zipCode?: string`)
- ❌ `responsibilities` - Documented as **required**, but **ACTUAL is optional** (defaults to `[]`)
- ❌ `requirements` - Documented as **required**, but **ACTUAL is optional** (defaults to `[]`)
- ❌ `qualifications` - Documented as **required**, but **ACTUAL is optional** (defaults to `[]`)
- ❌ `createdBy` - Documented as **required**, but **ACTUAL is optional** (defaults to `1`)

**Actual Required Fields:**
- ✅ `title` (required)
- ✅ `description` (required)
- ✅ `jobType` (required)
- ✅ `workExperience` (required)
- ✅ `city` (required)
- ✅ `state` (required)
- ✅ `country` (required)

**Optional Fields:**
- ✅ `salary` (optional)
- ✅ `zipCode` (optional)
- ✅ `responsibilities` (optional, defaults to `[]`)
- ✅ `requirements` (optional, defaults to `[]`)
- ✅ `qualifications` (optional, defaults to `[]`)
- ✅ `createdBy` (optional, defaults to `1`)

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Wrong format**: Returns raw Sequelize model, not transformed format

**Documented Response:**
```json
{
  "status": true,
  "message": "Job created successfully",
  "data": {
    "id": 1,
    "title": "...",
    ...
  }
}
```

**Actual Response:**
```json
{
  "id": 1,
  "title": "Software Engineer",
  "description": "...",
  "salary": "200000",
  "dateOpened": "2025-01-19T...",
  "jobType": "FULL_TIME",  // ✅ Note: Returns enum value, not transformed
  "workExperience": "...",
  "city": "...",
  "state": "...",
  "country": "...",
  "zipCode": "...",
  "requirements": [...],
  "qualifications": [...],
  "createdBy": 1,
  "isActive": true,
  "createdAt": "2025-01-19T...",
  "updatedAt": "2025-01-19T...",
  "responsibilities": [  // ✅ Included
    {
      "id": 1,
      "title": "Development",
      "points": [...],
      "order": 0,
      "jobId": 1
    }
  ]
}
```

**Note:** Response is **NOT transformed** - returns raw Sequelize model with enum values!

---

### 5. PUT /jobs/:id (Update Job)

#### Request Body Issues:
- ❌ Documentation says "Same as Create Job" but **ALL fields are optional** in update
- ❌ Missing note that this is a **partial update** (only provided fields are updated)

**Actual Behavior:**
- All fields are **optional**
- Only provided fields are updated
- `responsibilities` array replaces all existing responsibilities if provided

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ✅ Returns **transformed** job (unlike POST which returns raw model)

**Actual Response:**
```json
{
  "id": 1,
  "responsibilities": [...],
  "requirements": [...],
  "qualifications": [...],
  "jobInformation": {
    "title": "...",
    "description": "...",
    "salary": "...",
    "dateOpened": "...",
    "jobType": "full-time",  // ✅ Transformed (lowercase with hyphen)
    "workExperience": "...",
    "city": "...",
    "state": "...",
    "country": "...",
    "zipCode": "..."
  },
  "createdAt": "...",
  "updatedAt": "...",
  "applicationsCount": 5  // ✅ Present
}
```

---

### 6. DELETE /jobs/:id

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Wrong structure**: Documented shows `data: "Job deleted successfully"` but actual is just `{ message: "..." }`

**Documented:**
```json
{
  "status": true,
  "message": "Job deleted successfully",
  "data": "Job deleted successfully"
}
```

**Actual:**
```json
{
  "message": "Job deleted successfully"
}
```

---

### 7. POST /jobs/:id/apply (Apply to Job)

#### Path Parameter Issues:
- ❌ Documentation says `:jobId` but **ACTUAL route uses `:id`** (see `APPLICATION_ROUTES.APPLY_TO_JOB: "/jobs/:id/apply"`)

#### Request Body Issues:
- ❌ Documentation says `resume` (File, **required**), but **ACTUAL accepts `resumeUrl` (string, optional)** in JSON
- ❌ Missing documentation for **JSON request** (without file upload)
- ✅ FormData with file upload is documented but **NOT IMPLEMENTED** (controller only accepts JSON)

**Actual Request (JSON):**
```json
{
  "applicantName": "John Doe",      // ✅ Required
  "applicantEmail": "john@example.com", // ✅ Required
  "resumeUrl": "https://...",        // ✅ Optional (string, not File)
  "coverLetter": "..."               // ✅ Optional
}
```

**Note:** File upload via FormData is **NOT IMPLEMENTED** - only JSON with `resumeUrl` string!

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ Missing `resumeUrl` field in documented response

**Documented Response:**
```json
{
  "status": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "jobId": 1,
    "applicantName": "John Doe",
    "applicantEmail": "john@example.com",
    "coverLetter": "...",  // ❌ Missing resumeUrl
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Actual Response:**
```json
{
  "id": 1,
  "jobId": 1,
  "applicantName": "John Doe",
  "applicantEmail": "john@example.com",
  "resumeUrl": "https://...",  // ✅ Present (can be null)
  "coverLetter": "...",         // ✅ Present (can be null)
  "status": "pending",
  "createdAt": "2025-01-19T...",
  "updatedAt": "2025-01-19T..."
}
```

---

### 8. GET /jobs/applications (Get Job Applications)

#### Query Parameters Issues:
- ❌ `jobId` - Documented as `number`, but **ACTUAL is `string`** (query params are strings)
- ❌ `pageNumber` - Documented as `number`, but **ACTUAL is `string`**
- ❌ `limit` - Documented as `number`, but **ACTUAL is `string``

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Wrong structure**: Documented shows array wrapped in `data`, but actual is direct array
- ❌ **Missing `job` field**: Each application includes a `job` object with job details

**Documented Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "jobId": 1,
      "applicantName": "...",
      "applicantEmail": "...",
      "coverLetter": "...",  // ❌ Missing resumeUrl
      "status": "pending",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

**Actual Response:**
```json
[
  {
    "id": 1,
    "jobId": 1,
    "applicantName": "John Doe",
    "applicantEmail": "john@example.com",
    "resumeUrl": "https://...",  // ✅ Present
    "coverLetter": "...",         // ✅ Present
    "status": "pending",
    "createdAt": "2025-01-19T...",
    "updatedAt": "2025-01-19T...",
    "job": {  // ✅ MISSING in docs
      "id": 1,
      "title": "Software Engineer",
      "type": "full-time"
    }
  }
]
```

**Missing Fields:**
- `resumeUrl` (string | null)
- `job` (object with `id`, `title`, `type`)

---

### 9. PUT /jobs/applications/:id/status (Update Application Status)

#### Response Issues:
- ❌ **Missing wrapper**: No `status`, `message`, `data` wrapper
- ❌ **Missing `job` field**: Response includes `job` object
- ❌ **Missing `resumeUrl` field**: Response includes `resumeUrl`

**Documented Response:**
```json
{
  "status": true,
  "message": "Application status updated successfully",
  "data": {
    "id": 1,
    "jobId": 1,
    "applicantName": "...",
    "applicantEmail": "...",
    "coverLetter": "...",  // ❌ Missing resumeUrl
    "status": "reviewed",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Actual Response:**
```json
{
  "id": 1,
  "jobId": 1,
  "applicantName": "John Doe",
  "applicantEmail": "john@example.com",
  "resumeUrl": "https://...",  // ✅ Present
  "coverLetter": "...",         // ✅ Present
  "status": "reviewed",
  "createdAt": "2025-01-19T...",
  "updatedAt": "2025-01-19T...",
  "job": {  // ✅ MISSING in docs
    "id": 1,
    "title": "Software Engineer",
    "type": "full-time"
  }
}
```

---

## 🚨 MISSING APIs IN DOCUMENTATION

### 1. Health Check API
**Endpoint:** `GET /`
**Response:**
```json
{
  "title": "Success",
  "message": "The app is working properly!"
}
```

### 2. Authentication API
**Endpoint:** `POST /auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin",
    "createdAt": "2025-01-19T..."
  }
}
```

---

## ❌ ERROR RESPONSE FORMAT

**Documented (WRONG):**
```json
{
  "status": false,
  "message": "Error message",
  "data": null
}
```

**Actual:**
```json
{
  "error": "Error message"
}
```

---

## 📊 SUMMARY OF ISSUES

### Response Format Issues:
- ❌ All endpoints: Missing `status`, `message`, `data` wrapper (10 endpoints)
- ❌ All error responses: Wrong format (4 error types)

### Data Type Issues:
- ❌ Query parameters: `pageNumber`, `limit`, `jobId` documented as `number` but are `string` (5 occurrences)
- ❌ `zipCode` in POST /jobs: Documented as required but is optional
- ❌ `responsibilities`, `requirements`, `qualifications`, `createdBy` in POST /jobs: Documented as required but are optional

### Missing Fields:
- ❌ `applicationsCount` in job responses (3 endpoints)
- ❌ `resumeUrl` in application responses (3 endpoints)
- ❌ `job` object in application responses (2 endpoints)
- ❌ `jobInformation` structure details in GET /jobs response

### Wrong Fields:
- ❌ `title`, `description`, `location`, `type`, `salary` at root in GET /jobs (should be in `jobInformation`)
- ❌ `benefits` field (doesn't exist in model)
- ❌ `createdBy`, `isActive` in transformed responses (not returned)
- ❌ `location` field (should use `city`, `state`, `country`)

### Structural Issues:
- ❌ GET /jobs/cards: Documented as simple array but returns paginated object
- ❌ POST /jobs: Returns raw Sequelize model (not transformed)
- ❌ PUT /jobs: Returns transformed model (different from POST)
- ❌ POST /jobs/:id/apply: Path parameter name mismatch (`:jobId` vs `:id`)
- ❌ POST /jobs/:id/apply: File upload documented but not implemented

### Missing APIs:
- ❌ Health Check API (GET /)
- ❌ Authentication API (POST /auth/login)

### Query Parameter Issues:
- ❌ `category` parameter documented but not implemented in GET /jobs

---

## 📝 TOTAL ISSUES COUNT

- **Response Format Issues:** 14 (10 endpoints + 4 error types)
- **Data Type Issues:** 8
- **Missing Fields:** 8
- **Wrong Fields:** 12
- **Structural Issues:** 5
- **Missing APIs:** 2
- **Query Parameter Issues:** 1

**TOTAL: 50+ Issues Found**

---

**Last Updated:** January 2025

