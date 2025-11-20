// API Base Routes
export const API_ROUTES = {
  // Base paths
  HEALTH: "/",
  AUTH: "/auth",
  JOBS: "/jobs",
  APPLICATIONS: "/applications",
  NEWS: "/news",
  PORTFOLIO: "/portfolio",
} as const

// Specific endpoints
export const HEALTH_ROUTES = {
  HEALTH_CHECK: "/",
} as const

export const AUTH_ROUTES = {
  LOGIN: "/login",
} as const

export const JOB_ROUTES = {
  // Job CRUD operations
  GET_ALL: "/",
  GET_CARDS: "/cards",
  GET_BY_ID: "/:id",
  CREATE: "/",
  UPDATE: "/:id",
  DELETE: "/:id",
} as const

export const APPLICATION_ROUTES = {
  // Job application operations
  APPLY_TO_JOB: "/jobs/:jobId/apply",
  GET_JOB_APPLICATIONS: "/jobs/applications",
  UPDATE_APPLICATION_STATUS: "/jobs/applications/:id/status",
} as const

export const NEWS_ROUTES = {
  // News CRUD operations
  GET_ALL: "/",
  GET_BY_ID: "/:id",
  CREATE: "/",
  UPDATE: "/:id",
  DELETE: "/:id",
} as const

export const PORTFOLIO_ROUTES = {
  // Portfolio CRUD operations
  GET_ALL: "/",
  GET_BY_ID: "/:id",
  CREATE: "/",
  UPDATE: "/:id",
  DELETE: "/:id",
} as const

// Full route paths (for reference)
export const FULL_ROUTES = {
  // Health
  HEALTH_CHECK: API_ROUTES.HEALTH,

  // Auth
  LOGIN: `${API_ROUTES.AUTH}${AUTH_ROUTES.LOGIN}`,

  // Jobs
  GET_ALL_JOBS: `${API_ROUTES.JOBS}${JOB_ROUTES.GET_ALL}`,
  GET_JOB_CARDS: `${API_ROUTES.JOBS}${JOB_ROUTES.GET_CARDS}`,
  GET_JOB_BY_ID: `${API_ROUTES.JOBS}${JOB_ROUTES.GET_BY_ID}`,
  CREATE_JOB: `${API_ROUTES.JOBS}${JOB_ROUTES.CREATE}`,
  UPDATE_JOB: `${API_ROUTES.JOBS}${JOB_ROUTES.UPDATE}`,
  DELETE_JOB: `${API_ROUTES.JOBS}${JOB_ROUTES.DELETE}`,

  // Applications
  APPLY_TO_JOB: APPLICATION_ROUTES.APPLY_TO_JOB,
  GET_JOB_APPLICATIONS: APPLICATION_ROUTES.GET_JOB_APPLICATIONS,
  UPDATE_APPLICATION_STATUS: APPLICATION_ROUTES.UPDATE_APPLICATION_STATUS,

  // News
  GET_ALL_NEWS: `${API_ROUTES.NEWS}${NEWS_ROUTES.GET_ALL}`,
  GET_NEWS_BY_ID: `${API_ROUTES.NEWS}${NEWS_ROUTES.GET_BY_ID}`,
  CREATE_NEWS: `${API_ROUTES.NEWS}${NEWS_ROUTES.CREATE}`,
  UPDATE_NEWS: `${API_ROUTES.NEWS}${NEWS_ROUTES.UPDATE}`,
  DELETE_NEWS: `${API_ROUTES.NEWS}${NEWS_ROUTES.DELETE}`,

  // Portfolio
  GET_ALL_PORTFOLIO: `${API_ROUTES.PORTFOLIO}${PORTFOLIO_ROUTES.GET_ALL}`,
  GET_PORTFOLIO_BY_ID: `${API_ROUTES.PORTFOLIO}${PORTFOLIO_ROUTES.GET_BY_ID}`,
  CREATE_PORTFOLIO: `${API_ROUTES.PORTFOLIO}${PORTFOLIO_ROUTES.CREATE}`,
  UPDATE_PORTFOLIO: `${API_ROUTES.PORTFOLIO}${PORTFOLIO_ROUTES.UPDATE}`,
  DELETE_PORTFOLIO: `${API_ROUTES.PORTFOLIO}${PORTFOLIO_ROUTES.DELETE}`,
} as const
