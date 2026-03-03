import type { SearchParams } from '@/types/api';
import { SearchBar } from './SearchBar';
import { TEXT } from '@/constants/text';

export interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left rotated rectangles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-tertiary opacity-50 rotate-12 rounded-lg" />
        <div className="absolute top-32 left-24 w-24 h-24 bg-secondary opacity-30 -rotate-6 rounded-lg" />
        
        {/* Top-right rotated rectangles */}
        <div className="absolute top-16 right-16 w-40 h-40 bg-tertiary opacity-40 -rotate-12 rounded-lg" />
        <div className="absolute top-40 right-32 w-28 h-28 bg-secondary opacity-35 rotate-6 rounded-lg" />
        
        {/* Bottom-left rotated rectangles */}
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-tertiary opacity-45 -rotate-6 rounded-lg" />
        
        {/* Bottom-right rotated rectangles */}
        <div className="absolute bottom-24 right-24 w-32 h-32 bg-secondary opacity-40 rotate-12 rounded-lg" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Search */}
          <div className="text-center lg:text-left">
            {/* Heading with underline decoration */}
            <h1 className="font-heading font-semibold text-h2 md:text-h1 text-black mb-4">
              Discover more than{' '}
              <span className="relative inline-block">
                5000+ Jobs
                {/* Underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="#4640DE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-body text-body-lg text-neutral-700 mb-8 md:mb-12">
              {TEXT.hero.subtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl lg:max-w-none">
              <SearchBar onSearch={onSearch} />
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&auto=format"
              alt="Professional job seeker"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = 'https://via.placeholder.com/600x700/E5E7EB/6B7280?text=Professional';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
