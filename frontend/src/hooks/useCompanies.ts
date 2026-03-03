import { useState, useEffect } from 'react';
import { companyService } from '../services/companyService';
import type { Company } from '../types/company';

interface UseCompaniesParams {
  featured?: boolean;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseCompaniesResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
  fetchCompanies: (params?: { page?: number; limit?: number }) => Promise<void>;
  fetchFeaturedCompanies: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useCompanies(params?: UseCompaniesParams): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<UseCompaniesParams>(params || {});

  const fetchCompanies = async (fetchParams?: { page?: number; limit?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const results = await companyService.getCompanies(fetchParams);
      setCompanies(results);
      setCurrentParams({ ...currentParams, ...fetchParams });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch companies';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await companyService.getFeaturedCompanies();
      setCompanies(results);
      setCurrentParams({ ...currentParams, featured: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch featured companies';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    if (currentParams.featured) {
      await fetchFeaturedCompanies();
    } else {
      await fetchCompanies({ page: currentParams.page, limit: currentParams.limit });
    }
  };

  useEffect(() => {
    const shouldAutoFetch = params?.autoFetch !== false;
    if (shouldAutoFetch) {
      if (params?.featured) {
        fetchFeaturedCompanies();
      } else {
        fetchCompanies({ page: params?.page, limit: params?.limit });
      }
    }
  }, []);

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    fetchFeaturedCompanies,
    refetch,
  };
}
