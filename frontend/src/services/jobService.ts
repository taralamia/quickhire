import { apiClient } from './api';
import type { Job, JobCategory } from '../types/job';
import type { SearchParams } from '../types/api';
import {
  searchJobs as mockSearchJobs,
  getJobById as mockGetJobById,
  getJobsByCategory as mockGetJobsByCategory,
  getFeaturedJobs as mockGetFeaturedJobs,
  getLatestJobs as mockGetLatestJobs,
} from '../utils/mockData';

// Toggle between mock data and real backend
const USE_MOCK_DATA = false;

// Backend job type
interface BackendJob {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  salary?: string | null;
  description: string;
  requirements?: string | null;
  created_at: string;
}

// Backend API response wrapper
interface BackendResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

// Transform backend job to frontend format
function transformJob(backendJob: BackendJob): Job {
  return {
    id: backendJob.id.toString(),
    title: backendJob.title,
    company: {
      id: backendJob.company.toLowerCase().replace(/\s+/g, '-'),
      name: backendJob.company,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(backendJob.company)}&background=random`,
      description: '',
      location: backendJob.location,
      jobCount: 0,
    },
    location: backendJob.location,
    description: backendJob.description,
    requirements: backendJob.requirements?.split('\n').filter(r => r.trim()) || [],
    salary: backendJob.salary ? parseSalary(backendJob.salary) : undefined,
    jobTypes: [backendJob.type as any],
    category: backendJob.category as JobCategory,
    postedAt: new Date(backendJob.created_at),
  };
}


function parseSalary(salaryStr: string) {
  const match = salaryStr.match(/\$?([\d,]+)k?\s*-\s*\$?([\d,]+)k?/i);
  if (match) {
    return {
      min: parseInt(match[1].replace(/,/g, '')) * 1000,
      max: parseInt(match[2].replace(/,/g, '')) * 1000,
      currency: 'USD',
    };
  }
  return undefined;
}

export const jobService = {
  async searchJobs(params: SearchParams): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSearchJobs(params.query, params.location, params.category);
    }
    
    const queryParams: any = {};
    if (params.query) queryParams.title = params.query;
    if (params.location) queryParams.location = params.location;
    if (params.category) queryParams.category = params.category;
    
    const response = await apiClient.get<BackendResponse<BackendJob[]>>('/jobs', queryParams);
    return response.data.data.map(transformJob);
  },

  async getJobById(id: string): Promise<Job> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const job = mockGetJobById(id);
      if (!job) throw new Error('Job not found');
      return job;
    }
    
    const response = await apiClient.get<BackendResponse<BackendJob>>(`/jobs/${id}`);
    return transformJob(response.data.data);
  },

  async getJobsByCategory(category: JobCategory): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetJobsByCategory(category);
    }
    
    const response = await apiClient.get<BackendResponse<BackendJob[]>>('/jobs', { category });
    return response.data.data.map(transformJob);
  },

  async getFeaturedJobs(): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetFeaturedJobs();
    }
    
    // Backend doesn't have featured endpoint, get latest jobs
    const response = await apiClient.get<BackendResponse<BackendJob[]>>('/jobs', { limit: 6 });
    return response.data.data.map(transformJob);
  },

  async getLatestJobs(limit: number): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetLatestJobs(limit);
    }
    
    const response = await apiClient.get<BackendResponse<BackendJob[]>>('/jobs', { limit });
    return response.data.data.map(transformJob);
  },
};
