import { useNavigate } from 'react-router-dom';
import type { Job } from '@/types/job';
import { QHCard } from '@/components/ui/QHCard';
import { QHBadge } from '@/components/ui/QHBadge';

export interface JobCardProps {
  job: Job;
  onClick?: (jobId: string) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick(job.id);
    } else {
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <QHCard onClick={handleClick} hoverable className="flex flex-col gap-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Company Logo and Job Title */}
      <div className="flex items-start gap-4">
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="w-16 h-16 object-contain rounded border border-neutral-100"
          data-testid="company-logo"
        />
        <div className="flex-1 min-w-0">
          <h3
            className="text-[20px] font-semibold font-body text-neutral-900 mb-1 hover:text-primary transition-colors duration-200"
            data-testid="job-title"
          >
            {job.title}
          </h3>
          <p
            className="text-body text-neutral-600 font-body"
            data-testid="company-name"
          >
            {job.company.name}
          </p>
        </div>
      </div>

      {/* Job Description (if available) */}
      {job.description && (
        <p className="text-body-sm text-neutral-600 font-body line-clamp-2">
          {job.description}
        </p>
      )}

      {/* Location */}
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-neutral-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-body text-neutral-600 font-body" data-testid="location">
          {job.location}
        </span>
      </div>

      {/* Job Type Badges */}
      <div className="flex flex-wrap gap-2">
        {job.jobTypes.map((jobType) => (
          <QHBadge key={jobType} variant={jobType} data-testid="job-type-badge">
            {jobType}
          </QHBadge>
        ))}
      </div>
    </QHCard>
  );
}
