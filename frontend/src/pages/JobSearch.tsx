import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/features/SearchBar';
import { JobCard } from '@/components/features/JobCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useJobs } from '@/hooks/useJobs';
import type { SearchParams } from '@/types/api';
import type { JobCategory } from '@/types/job';

export function JobSearch() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchParams>({
    query: searchParams.get('query') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') as JobCategory | undefined,
  });

  const { jobs, loading, error, searchJobs } = useJobs(filters);

  useEffect(() => {
    if (location.state?.searchParams) {
      const params = location.state.searchParams as SearchParams;
      setFilters(params);
      searchJobs(params);
    }
  }, [location.state]);

  const handleSearch = (params: SearchParams) => {
    setFilters(params);
    searchJobs(params);
  };

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    searchJobs(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            initialQuery={filters.query}
            initialLocation={filters.location}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="HR">Human Resource</option>
          </select>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <ErrorMessage message={error} onRetry={() => searchJobs(filters)} />
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <>
            <div className="mb-4">
              <p className="text-neutral-700 font-medium">
                {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
