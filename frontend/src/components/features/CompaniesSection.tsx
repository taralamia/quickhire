import { TEXT } from '@/constants/text';

const COMPANY_LOGOS = [
  { name: 'Vodafone', logo: 'https://logo.clearbit.com/vodafone.com' },
  { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
  { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
  { name: 'AMD', logo: 'https://logo.clearbit.com/amd.com' },
  { name: 'Talkit', logo: 'https://via.placeholder.com/120x40/E5E7EB/6B7280?text=Talkit' },
];

export function CompaniesSection() {
  return (
    <section className="py-12 px-4 bg-white border-y border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-neutral-500 font-body text-body-md mb-8">
          {TEXT.sections.companiesWeHelped}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {COMPANY_LOGOS.map((company) => (
            <div
              key={company.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback to placeholder if logo fails to load
                  e.currentTarget.src = `https://via.placeholder.com/120x40/E5E7EB/6B7280?text=${company.name}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
