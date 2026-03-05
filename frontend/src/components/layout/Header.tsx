import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QHButton } from '../ui/QHButton';
import { TEXT } from '../../constants/text';
import { ROUTES } from '../../constants/routes';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <img 
              src="/assets/logo.svg" 
              alt="QuickHire" 
              className="h-8"
              onError={(e) => {
                // Fallback to text-only logo if SVG fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-2xl font-logo font-bold text-neutral-900">
              QuickHire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.jobs}
              className="text-body text-neutral-700 hover:text-primary transition-colors duration-200"
            >
              {TEXT.nav.findJobs}
            </Link>
            <Link
              to={ROUTES.companies}
              className="text-body text-neutral-700 hover:text-primary transition-colors duration-200"
            >
              {TEXT.nav.browseCompanies}
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <QHButton
              variant="ghost"
              size="md"
              onClick={() => handleNavigation(ROUTES.login)}
            >
              {TEXT.nav.login}
            </QHButton>
            <QHButton
              variant="primary"
              size="md"
              onClick={() => handleNavigation(ROUTES.dashboard)}
            >
              Sign Up
            </QHButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-tertiary transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-300">
            <nav className="flex flex-col space-y-4">
              <Link
                to={ROUTES.jobs}
                className="text-body text-neutral-700 hover:text-primary transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {TEXT.nav.findJobs}
              </Link>
              <Link
                to={ROUTES.companies}
                className="text-body text-neutral-700 hover:text-primary transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {TEXT.nav.browseCompanies}
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <QHButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavigation(ROUTES.login);
                  }}
                >
                  {TEXT.nav.login}
                </QHButton>
                <QHButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavigation(ROUTES.dashboard);
                  }}
                >
                  Sign Up
                </QHButton>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
