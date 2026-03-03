import type { Job, JobCategory } from '@/types/job';
import type { Company } from '@/types/company';

// Mock company data
export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo: '/assets/companies/google-logo.png',
    location: 'Mountain View, CA',
    description: 'A multinational technology company specializing in Internet-related services and products.',
    jobCount: 12,
  },
  {
    id: '2',
    name: 'Microsoft',
    logo: '/assets/companies/microsoft-logo.png',
    location: 'Redmond, WA',
    description: 'Leading technology company developing software, hardware, and cloud services.',
    jobCount: 8,
  },
  {
    id: '3',
    name: 'Apple',
    logo: '/assets/companies/apple-logo.png',
    location: 'Cupertino, CA',
    description: 'Innovative technology company known for consumer electronics and software.',
    jobCount: 15,
  },
  {
    id: '4',
    name: 'Amazon',
    logo: '/assets/companies/amazon-logo.png',
    location: 'Seattle, WA',
    description: 'E-commerce and cloud computing giant with diverse technology services.',
    jobCount: 20,
  },
  {
    id: '5',
    name: 'Meta',
    logo: '/assets/companies/meta-logo.png',
    location: 'Menlo Park, CA',
    description: 'Social technology company building the future of connection and community.',
    jobCount: 10,
  },
  {
    id: '6',
    name: 'Netflix',
    logo: '/assets/companies/netflix-logo.png',
    location: 'Los Gatos, CA',
    description: 'Streaming entertainment service with award-winning content.',
    jobCount: 6,
  },
  {
    id: '7',
    name: 'Tesla',
    logo: '/assets/companies/tesla-logo.png',
    location: 'Austin, TX',
    description: 'Electric vehicle and clean energy company accelerating sustainable transport.',
    jobCount: 14,
  },
  {
    id: '8',
    name: 'Spotify',
    logo: '/assets/companies/spotify-logo.png',
    location: 'Stockholm, Sweden',
    description: 'Audio streaming platform with millions of songs and podcasts.',
    jobCount: 7,
  },
];

// Mock job data
export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: MOCK_COMPANIES[0],
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced frontend developer to join our team.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design skills'],
    salary: { min: 120000, max: 180000, currency: 'USD' },
    jobTypes: ['Full-time', 'Remote'],
    category: 'Technology',
    postedAt: new Date('2024-01-15'),
    applicationDeadline: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Product Designer',
    company: MOCK_COMPANIES[2],
    location: 'New York, NY',
    description: 'Join our design team to create beautiful and intuitive user experiences.',
    requirements: ['3+ years design experience', 'Figma expertise', 'Portfolio required'],
    salary: { min: 100000, max: 150000, currency: 'USD' },
    jobTypes: ['Full-time'],
    category: 'Design',
    postedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: MOCK_COMPANIES[4],
    location: 'Austin, TX',
    description: 'Lead our marketing initiatives and grow our brand presence.',
    requirements: ['5+ years marketing experience', 'Digital marketing skills', 'Team leadership'],
    jobTypes: ['Full-time'],
    category: 'Marketing',
    postedAt: new Date('2024-01-18'),
  },
  {
    id: '4',
    title: 'Data Engineer',
    company: MOCK_COMPANIES[3],
    location: 'Seattle, WA',
    description: 'Build and maintain data pipelines for our analytics platform.',
    requirements: ['Python/SQL expertise', 'AWS experience', 'Data modeling skills'],
    salary: { min: 130000, max: 190000, currency: 'USD' },
    jobTypes: ['Full-time', 'Remote'],
    category: 'Engineering',
    postedAt: new Date('2024-01-22'),
  },
  {
    id: '5',
    title: 'Sales Representative',
    company: MOCK_COMPANIES[1],
    location: 'Chicago, IL',
    description: 'Drive sales growth and build relationships with enterprise clients.',
    requirements: ['3+ years B2B sales', 'CRM experience', 'Strong communication'],
    jobTypes: ['Full-time'],
    category: 'Sales',
    postedAt: new Date('2024-01-25'),
  },
  {
    id: '6',
    title: 'Financial Analyst',
    company: MOCK_COMPANIES[5],
    location: 'Boston, MA',
    description: 'Analyze financial data and provide insights for strategic decisions.',
    requirements: ['Finance degree', 'Excel proficiency', 'Analytical skills'],
    salary: { min: 80000, max: 120000, currency: 'USD' },
    jobTypes: ['Full-time'],
    category: 'Finance',
    postedAt: new Date('2024-01-12'),
  },
  {
    id: '7',
    title: 'HR Coordinator',
    company: MOCK_COMPANIES[6],
    location: 'Denver, CO',
    description: 'Support HR operations and employee engagement initiatives.',
    requirements: ['2+ years HR experience', 'HRIS knowledge', 'People skills'],
    jobTypes: ['Full-time'],
    category: 'HR',
    postedAt: new Date('2024-01-28'),
  },
  {
    id: '8',
    title: 'Business Analyst',
    company: MOCK_COMPANIES[7],
    location: 'Portland, OR',
    description: 'Bridge the gap between business needs and technical solutions.',
    requirements: ['Business analysis experience', 'SQL skills', 'Agile methodology'],
    jobTypes: ['Full-time', 'Remote'],
    category: 'Business',
    postedAt: new Date('2024-01-30'),
  },
];

// Category job counts
export const CATEGORY_JOB_COUNTS: Record<JobCategory, number> = {
  Design: 45,
  Sales: 32,
  Marketing: 28,
  Finance: 18,
  Technology: 67,
  Engineering: 54,
  Business: 39,
  HR: 22,
};

// Popular search terms
export const POPULAR_SEARCHES = [
  'Frontend Developer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
  'Marketing Manager',
];

// Get featured companies (first 4)
export function getFeaturedCompanies(): Company[] {
  return MOCK_COMPANIES.slice(0, 4);
}

// Get latest jobs (first 6)
export function getLatestJobs(limit: number = 6): Job[] {
  return MOCK_JOBS.slice(0, limit);
}

// Get featured jobs (jobs with remote option)
export function getFeaturedJobs(): Job[] {
  return MOCK_JOBS.filter(job => job.jobTypes.includes('Remote'));
}

// Get jobs by category
export function getJobsByCategory(category: JobCategory): Job[] {
  return MOCK_JOBS.filter(job => job.category === category);
}

// Search jobs
export function searchJobs(query?: string, location?: string, category?: JobCategory): Job[] {
  let results = [...MOCK_JOBS];

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      job =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery) ||
        job.company.name.toLowerCase().includes(lowerQuery)
    );
  }

  if (location) {
    results = results.filter(job => job.location.includes(location));
  }

  if (category) {
    results = results.filter(job => job.category === category);
  }

  return results;
}

// Get job by ID
export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find(job => job.id === id);
}

// Get company by ID
export function getCompanyById(id: string): Company | undefined {
  return MOCK_COMPANIES.find(company => company.id === id);
}
