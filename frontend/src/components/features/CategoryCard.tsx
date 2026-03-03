import React from 'react';
import type { JobCategory } from '@/types/job';
import { QHCard } from '@/components/ui/QHCard';

export interface CategoryCardProps {
  category: JobCategory;
  jobCount: number;
  icon: React.ReactNode;
  featured?: boolean;
  onClick: (category: JobCategory) => void;
}

export function CategoryCard({
  category,
  jobCount,
  icon,
  featured = false,
  onClick,
}: CategoryCardProps) {
  const handleClick = () => {
    onClick(category);
  };

  const cardClassName = featured
    ? 'flex flex-col items-center gap-4 bg-primary text-white'
    : 'flex flex-col items-center gap-4';

  const textColorClass = featured ? 'text-white' : 'text-neutral-600';
  const headingColorClass = featured ? 'text-white' : 'text-neutral-900';

  return (
    <QHCard onClick={handleClick} hoverable className={cardClassName}>
      {/* Category Icon */}
      <div
        className="flex items-center justify-center w-16 h-16"
        data-testid="category-icon"
      >
        {icon}
      </div>

      {/* Category Name */}
      <h3
        className={`text-[20px] font-semibold font-body ${headingColorClass}`}
        data-testid="category-name"
      >
        {category}
      </h3>

      {/* Job Count */}
      <p
        className={`text-body font-body ${textColorClass}`}
        data-testid="job-count"
      >
        {jobCount} {jobCount === 1 ? 'job' : 'jobs'} available
      </p>
    </QHCard>
  );
}
