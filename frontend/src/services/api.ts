import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse, ApiError } from '../types/api';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error))
    );
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, { params });
    return {
      data: response.data,
      status: response.status,
    };
  }

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data);
    return {
      data: response.data,
      status: response.status,
    };
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url);
    return {
      data: response.data,
      status: response.status,
    };
  }

  handleError(error: AxiosError): ApiError {
    if (error.response) {
      const responseData = error.response.data as any;
      return {
        message: responseData?.message || 'An error occurred',
        status: error.response.status,
        errors: responseData?.errors,
      };
    }
    
    if (error.request) {
      return {
        message: 'Network error - no response received',
        status: 0,
      };
    }
    
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api');
export default ApiClient;
