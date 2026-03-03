import type { Company } from '@/types/company';
import { QHCard } from '@/components/ui/QHCard';

export interface CompanyCardProps {
  company: Company;
  featured?: boolean;
}

export function CompanyCard({ company, featured = false }: CompanyCardProps) {
  const cardClassName = featured
    ? 'flex flex-col gap-4 bg-primary text-white border-primary shadow-lg hover:shadow-xl transition-all duration-200'
    : 'flex flex-col gap-4 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200';

  const textColorClass = featured ? 'text-white' : 'text-neutral-600';
  const headingColorClass = featured ? 'text-white' : 'text-neutral-900';

  return (
    <QHCard className={cardClassName}>
      {/* Company Logo */}
      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg border border-neutral-100">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-12 h-12 object-contain"
          data-testid="company-logo"
        />
      </div>

      {/* Company Name */}
      <h3
        className={`text-[20px] font-semibold font-body ${headingColorClass}`}
        data-testid="company-name"
      >
        {company.name}
      </h3>

      {/* Location and Job Count */}
      <div className="flex items-center gap-2">
        <span className={`text-body font-body ${textColorClass}`} data-testid="location">
          {company.location}
        </span>
        <span className={`text-body font-body ${textColorClass}`}>•</span>
        <span className={`text-body font-body ${textColorClass}`} data-testid="job-count">
          {company.jobCount} {company.jobCount === 1 ? 'job' : 'jobs'}
        </span>
      </div>

      {/* Company Description */}
      <p
        className={`text-body font-body ${textColorClass} line-clamp-3`}
        data-testid="company-description"
      >
        {company.description}
      </p>
    </QHCard>
  );
}
