import { apiClient } from './api';
import type { Company } from '../types/company';
import {
  MOCK_COMPANIES,
  getFeaturedCompanies as mockGetFeaturedCompanies,
  getCompanyById as mockGetCompanyById,
} from '../utils/mockData';

// Use mock data since backend doesn't have company endpoints
const USE_MOCK_DATA = true;

export const companyService = {
  async getCompanies(params?: { page?: number; limit?: number }): Promise<Company[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const { page = 1, limit = 10 } = params || {};
      const start = (page - 1) * limit;
      const end = start + limit;
      return MOCK_COMPANIES.slice(start, end);
    }
    const response = await apiClient.get<Company[]>('/companies', params);
    return response.data;
  },

  async getCompanyById(id: string): Promise<Company> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const company = mockGetCompanyById(id);
      if (!company) throw new Error('Company not found');
      return company;
    }
    const response = await apiClient.get<Company>(`/companies/${id}`);
    return response.data;
  },

  async getFeaturedCompanies(): Promise<Company[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGetFeaturedCompanies();
    }
    const response = await apiClient.get<Company[]>('/companies/featured');
    return response.data;
  },
};
