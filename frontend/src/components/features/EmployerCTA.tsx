import { QHButton } from '@/components/ui/QHButton';
import { TEXT } from '@/constants/text';

export interface EmployerCTAProps {
  onSignUp?: () => void;
}

export function EmployerCTA({ onSignUp }: EmployerCTAProps) {
  return (
    <section className="bg-primary py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and CTA */}
          <div className="text-center lg:text-left">
            {/* Heading */}
            <h2 className="font-heading font-semibold text-h2 text-white mb-4">
              {TEXT.employerCta.title}
            </h2>

            {/* Subtitle */}
            <p className="font-body text-body-lg text-white/90 mb-8">
              {TEXT.employerCta.subtitle}
            </p>

            {/* Sign Up Button */}
            <QHButton
              variant="secondary"
              size="lg"
              onClick={onSignUp}
            >
              {TEXT.employerCta.button}
            </QHButton>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="hidden lg:block">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format"
                alt="Dashboard preview"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = 'https://via.placeholder.com/800x600/E5E7EB/6B7280?text=Dashboard+Preview';
                }}
              />
              {/* Overlay gradient for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
