import  { useState, useEffect } from 'react';
import { jobService } from '@/services/jobService';
import type { Job } from '@/types/job';
import { JobCard } from './JobCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { TEXT } from '@/constants/text';

export function LatestJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const latestJobs = await jobService.getLatestJobs(12);
      setJobs(latestJobs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load latest jobs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const handleJobClick = (jobId: string) => {
    // Navigation will be handled when routing is implemented
    console.log('Job clicked:', jobId);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-h2 font-heading font-semibold text-neutral-900 mb-8">
            Latest jobs open
          </h2>
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-h2 font-heading font-semibold text-neutral-900 mb-8">
            Latest jobs open
          </h2>
          <ErrorMessage message={error} onRetry={fetchLatestJobs} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-h2 font-heading font-semibold text-neutral-900">
            Latest jobs open
          </h2>
          <a
            href="#"
            className="text-primary font-body text-body-md font-semibold hover:text-primary-dark transition-colors duration-200 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              console.log('Show all jobs clicked');
            }}
          >
            {TEXT.sections.showAllJobs}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
        
        {jobs.length === 0 ? (
          <p className="text-body-lg text-neutral-600 text-center py-8">
            No jobs available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
