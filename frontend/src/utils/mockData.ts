import type { Job, JobCategory } from '@/types/job';
import type { Company } from '@/types/company';

// --------------------
// Companies
// --------------------
export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Byjus',
    logo: '/assets/companies/byjus.svg',
    location: 'India, Bangalore',
    description: 'EdTech platform for personalized learning.',
    jobCount: 12,
  },
  {
    id: '2',
    name: 'Magoosh',
    logo: '/assets/companies/magoosh.svg',
    location: 'USA',
    description: 'Online test preparation platform.',
    jobCount: 8,
  },
  {
    id: '3',
    name: 'Apple',
    logo: '/assets/companies/apple-logo.png',
    location: 'Cupertino, CA',
    description: 'Consumer electronics company.',
    jobCount: 15,
  },
  {
    id: '4',
    name: 'Amazon',
    logo: '/assets/companies/amazon-logo.png',
    location: 'Seattle, WA',
    description: 'E-commerce and cloud computing.',
    jobCount: 20,
  },
  {
    id: '5',
    name: 'Meta',
    logo: '/assets/companies/meta-logo.png',
    location: 'Menlo Park, CA',
    description: 'Social technology company.',
    jobCount: 10,
  },
];

// --------------------
// Jobs (mutable)
// --------------------
let jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: MOCK_COMPANIES[0],
    location: 'San Francisco, CA',
    description: 'Experienced frontend developer needed.',
    requirements: ['React', 'TypeScript'],
    salary: { min: 120000, max: 180000, currency: 'USD' },
    jobTypes: ['Full-time', 'Remote'],
    category: 'Technology',
    postedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Product Designer',
    company: MOCK_COMPANIES[2],
    location: 'New York, NY',
    description: 'Design user experiences.',
    requirements: ['Figma', 'Portfolio'],
    jobTypes: ['Full-time'],
    category: 'Design',
    postedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: MOCK_COMPANIES[4],
    location: 'Austin, TX',
    description: 'Lead marketing.',
    requirements: ['Digital marketing'],
    jobTypes: ['Full-time'],
    category: 'Marketing',
    postedAt: new Date('2024-01-18'),
  },
  {
    id: '4',
    title: 'Data Engineer',
    company: MOCK_COMPANIES[3],
    location: 'Seattle, WA',
    description: 'Build pipelines.',
    requirements: ['Python', 'SQL'],
    jobTypes: ['Full-time', 'Remote'],
    category: 'Engineering',
    postedAt: new Date('2024-01-22'),
  },
];

// --------------------
// Popular Searches
// --------------------
export const POPULAR_SEARCHES = [
  'Frontend Developer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
];

// --------------------
// JOB CRUD
// --------------------
export function getAllJobs(): Job[] {
  return jobs;
}

export function addJob(newJob: Job) {
  jobs.unshift(newJob);
}

export function deleteJob(id: string) {
  jobs = jobs.filter(j => j.id !== id);
}


export function searchJobs(
  query?: string,
  location?: string,
  category?: JobCategory
): Job[] {
  let results = [...jobs];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      job =>
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.company.name.toLowerCase().includes(q)
    );
  }

  if (location) {
    results = results.filter(job =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (category) {
    results = results.filter(job => job.category === category);
  }

  return results;
}


export function getCategoryCounts(): Record<JobCategory, number> {
  const counts: Record<JobCategory, number> = {
    Design: 0,
    Sales: 0,
    Marketing: 0,
    Finance: 0,
    Technology: 0,
    Engineering: 0,
    Business: 0,
    HR: 0,
  };

  jobs.forEach(job => {
    counts[job.category]++;
  });

  return counts;
}

export function getJobsByCategory(category: JobCategory): Job[] {
  return jobs.filter(job => job.category === category);
}


export function getCompanyById(id: string): Company | undefined {
  return MOCK_COMPANIES.find(c => c.id === id);
}

export function getFeaturedCompanies(): Company[] {
  return MOCK_COMPANIES.slice(0, 4);
}
export function getJobById(id: string): Job | undefined {
  return jobs.find(job => job.id === id);
}

export function getFeaturedJobs(): Job[] {
  // Example logic: Remote jobs = featured
  return jobs.filter(job => job.jobTypes.includes('Remote'));
}

export function getLatestJobs(limit: number = 6): Job[] {
  return [...jobs]
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
    .slice(0, limit);
}
export const CATEGORY_JOB_COUNTS = getCategoryCounts();