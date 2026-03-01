export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  errors?: { msg: string; path: string }[];
}
export interface AppError extends Error {
  status?: number;
}
export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
}