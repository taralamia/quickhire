import { apiClient } from './api';

export interface Application {
  id: number;
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at: string;
}

export interface CreateApplicationDto {
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
}

interface BackendResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export const applicationService = {
  async submitApplication(data: CreateApplicationDto): Promise<Application> {
    const response = await apiClient.post<BackendResponse<Application>>('/applications', data);
    return response.data.data;
  },

  async getApplicationById(id: number): Promise<Application> {
    const response = await apiClient.get<BackendResponse<Application>>(`/applications/${id}`);
    return response.data.data;
  },

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    const response = await apiClient.get<BackendResponse<Application[]>>('/applications', { job_id: jobId });
    return response.data.data;
  },

  async getAllApplications(): Promise<Application[]> {
    const response = await apiClient.get<BackendResponse<Application[]>>('/applications');
    return response.data.data;
  },

  async deleteApplication(id: number): Promise<void> {
    await apiClient.delete(`/applications/${id}`);
  },
};
