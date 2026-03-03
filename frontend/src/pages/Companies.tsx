import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CompanyCard } from '@/components/features/CompanyCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useCompanies } from '@/hooks/useCompanies';

export function Companies() {
  const { companies, loading, error, refetch } = useCompanies();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Browse Companies</h1>
          <p className="text-lg text-neutral-600">
            Discover companies hiring on QuickHire
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {!loading && !error && companies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No companies found.</p>
          </div>
        )}

        {!loading && !error && companies.length > 0 && (
          <>
            <div className="mb-4">
              <p className="text-neutral-700 font-medium">
                {companies.length} {companies.length === 1 ? 'company' : 'companies'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
