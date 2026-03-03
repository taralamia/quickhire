import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QHButton } from '@/components/ui/QHButton';
import { QHBadge } from '@/components/ui/QHBadge';
import { QHInput } from '@/components/ui/QHInput';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { jobService } from '@/services/jobService';
import type { Job } from '@/types/job';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Application form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    coverNote: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobById(jobId);
      setJob(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.resumeUrl.trim()) {
      errors.resumeUrl = 'Resume URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.resumeUrl)) {
      errors.resumeUrl = 'Please enter a valid URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Call application API when implemented
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', resumeUrl: '', coverNote: '' });
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (err) {
      setFormErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorMessage 
            message={error || 'Job not found'} 
            onRetry={id ? () => loadJob(id) : undefined}
          />
          <div className="mt-6">
            <QHButton variant="outline" size="md" onClick={() => navigate('/jobs')}>
              Back to Jobs
            </QHButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:text-primary/80 mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg p-8 mb-6 shadow-sm">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-20 h-20 rounded-lg object-contain"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{job.title}</h1>
              <p className="text-lg text-neutral-700 mb-3">{job.company.name}</p>
              <p className="text-neutral-600 mb-4">📍 {job.location}</p>
              <div className="flex flex-wrap gap-2">
                {job.jobTypes.map((type) => (
                  <QHBadge key={type} variant={type.toLowerCase().replace('-', '') as any}>
                    {type}
                  </QHBadge>
                ))}
              </div>
            </div>
            <div>
              <QHButton
                variant="primary"
                size="lg"
                onClick={() => setShowApplicationForm(!showApplicationForm)}
              >
                {showApplicationForm ? 'Hide Form' : 'Apply Now'}
              </QHButton>
            </div>
          </div>

          {job.salary && (
            <div className="border-t pt-4">
              <p className="text-neutral-700 font-semibold">
                Salary: {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Application Form */}
        {showApplicationForm && (
          <div className="bg-white rounded-lg p-8 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Apply for this position</h2>
            
            {submitSuccess && (
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4 mb-6">
                <p className="text-accent-green font-medium">Application submitted successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Full Name <span className="text-accent-red">*</span>
                </label>
                <QHInput
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  error={formErrors.name}
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Email <span className="text-accent-red">*</span>
                </label>
                <QHInput
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  error={formErrors.email}
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Resume Link (URL) <span className="text-accent-red">*</span>
                </label>
                <QHInput
                  type="text"
                  placeholder="https://example.com/resume.pdf"
                  value={formData.resumeUrl}
                  onChange={(value) => setFormData({ ...formData, resumeUrl: value })}
                  error={formErrors.resumeUrl}
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Cover Note
                </label>
                <textarea
                  placeholder="Tell us why you're a great fit for this role..."
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {formErrors.submit && (
                <ErrorMessage message={formErrors.submit} />
              )}

              <div className="flex gap-4">
                <QHButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </QHButton>
                <QHButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </QHButton>
              </div>
            </form>
          </div>
        )}

        {/* Job Description */}
        <div className="bg-white rounded-lg p-8 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Job Description</h2>
          <div className="text-neutral-700 whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="bg-white rounded-lg p-8 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Company Info */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">About {job.company.name}</h2>
          <div className="flex items-start gap-6">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-16 h-16 rounded-lg object-contain"
            />
            <div>
              <p className="text-neutral-700 mb-2">{job.company.description}</p>
              <p className="text-neutral-600">📍 {job.company.location}</p>
              <p className="text-neutral-600 mt-2">
                {job.company.jobCount} open {job.company.jobCount === 1 ? 'position' : 'positions'}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
