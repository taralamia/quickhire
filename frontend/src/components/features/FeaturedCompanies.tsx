import { useCompanies } from '@/hooks/useCompanies';
import { CompanyCard } from './CompanyCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { TEXT } from '@/constants/text';

export function FeaturedCompanies() {
  const { companies, loading, error, refetch } = useCompanies({
    featured: true,
    limit: 8,
  });

  if (loading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-heading font-semibold text-neutral-900 mb-2">
              Featured Companies
            </h2>
            <p className="text-body-lg font-body text-neutral-600">
              Get hired in top companies
            </p>
          </div>
          <a
            href="#"
            className="text-primary font-body text-body-md font-semibold hover:text-primary-dark transition-colors duration-200 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              console.log('Show all companies clicked');
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

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
