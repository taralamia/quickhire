export const ROUTES = {
  home: '/',
  jobs: '/jobs',
  jobDetails: (id: string) => `/jobs/${id}`,
  companies: '/companies',
  companyDetails: (id: string) => `/companies/${id}`,
  dashboard: '/dashboard',
  dashboardJobs: '/dashboard/jobs',
  dashboardApplicants: '/dashboard/applicants',
  dashboardMessages: '/dashboard/messages',
  dashboardSettings: '/dashboard/settings',
  login: '/login',
  register: '/register',
} as const;
