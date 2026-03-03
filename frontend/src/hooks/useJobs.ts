import { useState, useEffect } from 'react';
import { jobService } from '../services/jobService';
import type { Job } from '../types/job';
import type { SearchParams } from '../types/api';

interface UseJobsResult {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  searchJobs: (params: SearchParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useJobs(initialParams?: SearchParams): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<SearchParams>(initialParams || {});

  const searchJobs = async (newParams: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const results = await jobService.searchJobs(newParams);
      setJobs(results);
      setParams(newParams);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching jobs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => searchJobs(params);

  useEffect(() => {
    searchJobs(params);
  }, []);

  return { jobs, loading, error, searchJobs, refetch };
}
