import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
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

  const [formData, setFormData] = useState({ name: '', email: '', resumeUrl: '', coverNote: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (id) loadJob(id);
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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.resumeUrl.trim()) errors.resumeUrl = 'Resume URL is required';
    else if (!/^https?:\/\/.+/.test(formData.resumeUrl)) errors.resumeUrl = 'Please enter a valid URL';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', resumeUrl: '', coverNote: '' });
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      setFormErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </PageWrapper>
    );
  }

  if (error || !job) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorMessage message={error || 'Job not found'} onRetry={id ? () => loadJob(id) : undefined} />
          <div className="mt-6">
            <QHButton variant="outline" size="md" onClick={() => navigate('/jobs')}>
              Back to Jobs
            </QHButton>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-primary hover:text-primary/80 mb-6 flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Job Header, Application Form, Description, Requirements, Company Info */}
      {/* ... keep the rest of your JSX as-is inside PageWrapper ... */}
    </PageWrapper>
  );
}