import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { HeroSection } from '@/components/features/HeroSection';
import { PopularSearches } from '@/components/features/PopularSearches';
import { CompaniesSection } from '@/components/features/CompaniesSection';
import { CategoryGrid } from '@/components/features/CategoryGrid';
import { FeaturedCompanies } from '@/components/features/FeaturedCompanies';
import { LatestJobs } from '@/components/features/LatestJobs';
import { EmployerCTA } from '@/components/features/EmployerCTA';
import type { SearchParams } from '@/types/api';
import type { JobCategory } from '@/types/job';

export function Landing() {
  const navigate = useNavigate();

  const handleSearch = (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.set('query', params.query);
    if (params.location) searchParams.set('location', params.location);
    if (params.category) searchParams.set('category', params.category);
    navigate(`/jobs?${searchParams.toString()}`, { state: { searchParams: params } });
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    handleSearch({ query: searchTerm });
  };

  const handleCategoryClick = (category: JobCategory) => {
    handleSearch({ category });
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />
      {/* Companies Section */}
      <CompaniesSection />
      {/* Popular Searches */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PopularSearches onSearchClick={handlePopularSearchClick} />
      </div>
      {/* Category Grid */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />
      {/* Featured Companies */}
      <FeaturedCompanies />
      {/* Latest Jobs */}
      <LatestJobs />
      {/* Employer CTA */}
      <EmployerCTA onSignUp={handleSignUp} />
    </PageWrapper>
  );
}