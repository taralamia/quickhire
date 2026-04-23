import { TEXT } from '@/constants/text';

const COMPANY_LOGOS = [
  { name: 'Magoosh', logo: '/assets/companies/magoosh.svg' },
  { name: 'Byjus', logo: '/assets/companies/byjus.svg' },
  { name: 'Gregmat', logo: '/assets/companies/gregmat.svg' },
  { name: 'Food Panda', logo: '/assets/companies/foodpanda.svg' },
  { name: 'Rokomari', logo: '/assets/companies/rokomari.svg' },
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
              className="flex items-center justify-center w-24 h-16"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to local placeholder if logo fails to load
                  e.currentTarget.src = '/assets/companies/placeholder.svg';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
