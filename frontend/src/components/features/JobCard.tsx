import React from 'react';
import type { Job } from '@/types/job';
import { QHCard } from '@/components/ui/QHCard';
import { QHBadge } from '@/components/ui/QHBadge';

export interface JobCardProps {
  job: Job;
  onClick: (jobId: string) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const handleClick = () => {
    onClick(job.id);
  };

  return (
    <QHCard onClick={handleClick} hoverable className="flex flex-col gap-4">
      {/* Company Logo and Job Title */}
      <div className="flex items-start gap-4">
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="w-16 h-16 object-contain rounded"
          data-testid="company-logo"
        />
        <div className="flex-1 min-w-0">
          <h3
            className="text-[20px] font-semibold font-body text-neutral-900 mb-1"
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

      {/* Location */}
      <div className="flex items-center gap-2">
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
