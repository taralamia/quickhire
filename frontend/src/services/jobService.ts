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

// Use mock data for now since backend only has basic job endpoints
const USE_MOCK_DATA = true;

export const jobService = {
  async searchJobs(params: SearchParams): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSearchJobs(params.query, params.location, params.category);
    }
    const response = await apiClient.get<Job[]>('/jobs', params);
    return response.data;
  },

  async getJobById(id: string): Promise<Job> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const job = mockGetJobById(id);
      if (!job) throw new Error('Job not found');
      return job;
    }
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  async getJobsByCategory(category: JobCategory): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetJobsByCategory(category);
    }
    const response = await apiClient.get<Job[]>('/jobs', { category });
    return response.data;
  },

  async getFeaturedJobs(): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetFeaturedJobs();
    }
    // Backend doesn't have this endpoint, fallback to mock
    return mockGetFeaturedJobs();
  },

  async getLatestJobs(limit: number): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetLatestJobs(limit);
    }
    // Backend doesn't have this endpoint, fallback to mock
    return mockGetLatestJobs(limit);
  },
};
