import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Footer } from '@/components/layout/Footer';
import { QHButton } from '@/components/ui/QHButton';
import { QHInput } from '@/components/ui/QHInput';
import { ROUTES } from '@/constants/routes';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Demo authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email && password) {
        navigate(ROUTES.dashboard);
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-h2 leading-tight font-heading font-semibold text-neutral-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-body-lg text-neutral-600">
              Sign in to your account
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-4">
                  <p className="text-accent-red text-body">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Email Address
                </label>
                <QHInput
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Password
                </label>
                <QHInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              <QHButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </QHButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-body text-neutral-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.dashboard)}
                  className="text-primary font-semibold hover:text-primary-dark transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}