import type { JobType, JobCategory } from './job';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface SearchParams {
  query?: string;
  location?: string;
  category?: JobCategory;
  jobTypes?: JobType[];
  page?: number;
  limit?: number;
}
