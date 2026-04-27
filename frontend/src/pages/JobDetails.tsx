import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { QHButton } from '@/components/ui/QHButton';
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

  const [formData, setFormData] = useState({ 
  name: '', 
  email: '', 
  resumeText: '', // NEW
  coverNote: '' 
});
  const [,setFormErrors] = useState<Record<string, string>>({});
  const [,setSubmitting] = useState(false);
  const [,setSubmitSuccess] = useState(false);
  const [, setShowApplicationForm] = useState(false);

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
    if (!formData.resumeText.trim()) {
  errors.resumeText = 'Resume text is required';
}
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
      setFormData({ name: '', email: '', resumeText: '', coverNote: '' });
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
const handleGenerateCoverLetter = async () => {
  if (!formData.resumeText.trim()) {
    alert("Please paste your resume first");
    return;
  }

  if (!job?.description) {
    alert("Job description not available");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/ai/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        resumeText: formData.resumeText,
        jobDescription: job.description
      })
    });

    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      coverNote: data.result || ""
    }));

  } catch (err) {
    console.error(err);
    alert("Failed to generate cover letter");
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

      <div className="flex items-center gap-3 mb-6">
  <button
    onClick={() => navigate(-1)}
    className="text-primary hover:text-primary/80 flex items-center gap-2"
  >
    ← Back
  </button>
  <span className="text-neutral-400">/</span>
  <span className="text-neutral-600">Job Details</span>
</div>

      {/* Job Header, Application Form, Description, Requirements, Company Info */}
        <div className="px-4 md:px-6 lg:px-8 py-10">
  <div className="max-w-2xl mx-auto">
    
    {/* Form Card */}
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 md:p-8">

      {/* Title */}
      <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
        Apply for this job
      </h2>
      <p className="text-neutral-600 mb-6">
        Fill in your details and submit your application.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>
{/* Resume Text */}
<div>
  <label className="block text-sm font-medium text-neutral-700 mb-1">
    Resume Content
  </label>
  <textarea
    rows={5}
    value={formData.resumeText}
    onChange={(e) =>
      setFormData({ ...formData, resumeText: e.target.value })
    }
    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    placeholder="Paste your resume content here..."
  />
</div>
        {/* Cover Letter */}
        <div>
          <div className="flex justify-between items-center mb-1">
  <label className="block text-sm font-medium text-neutral-700">
    Cover Letter
  </label>

  <button
    type="button"
    onClick={handleGenerateCoverLetter}
    className="text-sm text-primary font-medium hover:underline"
  >
    ✨ Generate with AI
  </button>
</div>
          <textarea
            rows={4}
            value={formData.coverNote}
            onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write a short message..."
          />
        </div>

        {/* Submit */}
        <QHButton type="submit" variant="primary" size="lg">
          Submit Application
        </QHButton>

      </form>
    </div>
  </div>
</div>
    </PageWrapper>
  );
}

