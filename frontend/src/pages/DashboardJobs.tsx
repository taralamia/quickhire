import { useState, useEffect } from 'react';
import { QHButton } from '@/components/ui/QHButton';
import { QHInput } from '@/components/ui/QHInput';
import { QHBadge } from '@/components/ui/QHBadge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

import {
  getAllJobs,
  addJob,
  deleteJob,
  MOCK_COMPANIES,
} from '@/utils/mockData';

import type { Job, JobType, JobCategory } from '@/types/job';

export function DashboardJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
    requirements: '',
    category: '' as JobCategory | '',
    jobTypes: [] as JobType[],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = getAllJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.jobTypes.length === 0) errors.jobTypes = 'Select at least one job type';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const newJob: Job = {
        id: Date.now().toString(),
        title: formData.title,
        company:
          MOCK_COMPANIES.find(c => c.name === formData.companyName) ||
          MOCK_COMPANIES[0], // fallback
        location: formData.location,
        description: formData.description,
        requirements: formData.requirements
          ? formData.requirements.split('\n')
          : [],
        jobTypes: formData.jobTypes,
        category: formData.category as JobCategory,
        postedAt: new Date(),
      };

      addJob(newJob);

      // reset
      setFormData({
        title: '',
        companyName: '',
        location: '',
        description: '',
        requirements: '',
        category: '',
        jobTypes: [],
      });

      setShowAddForm(false);
      await loadJobs();
    } catch (err) {
      setFormErrors({ submit: 'Failed to create job.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      deleteJob(jobId);
      await loadJobs();
    } catch {
      alert('Failed to delete job');
    }
  };

  const toggleJobType = (type: JobType) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h2 font-heading font-semibold text-neutral-900 mb-2">
            Job Management
          </h1>
          <p className="text-body-lg text-neutral-600">
            Manage and create job postings
          </p>
        </div>

        <QHButton
          variant="primary"
          size="lg"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add New Job'}
        </QHButton>
      </div>

      {/* Add Job Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Add New Job</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <QHInput
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(v) => setFormData({ ...formData, title: v })}
              error={formErrors.title}
            />

            <QHInput
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(v) => setFormData({ ...formData, companyName: v })}
              error={formErrors.companyName}
            />

            <QHInput
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })}
              error={formErrors.location}
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as JobCategory })
              }
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="">Select category</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Technology">Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="HR">Human Resource</option>
            </select>

            <div className="flex flex-wrap gap-3">
              {(['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'] as JobType[]).map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.jobTypes.includes(type)}
                    onChange={() => toggleJobType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Requirements (one per line)"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            {formErrors.submit && <ErrorMessage message={formErrors.submit} />}

            <QHButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Job'}
            </QHButton>
          </form>
        </div>
      )}

      {/* States */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* Jobs */}
      {!loading && !error && (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 flex justify-between">
              <div className="flex gap-4">
                <img
                  src={job.company.logo || '/assets/companies/default.png'}
                  alt={job.company.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>{job.company.name}</p>

                  <div className="flex gap-2 mt-2">
                    {job.jobTypes.map((type) => (
                      <QHBadge key={type} variant={type}>{type}</QHBadge>
                    ))}
                  </div>
                </div>
              </div>

              <QHButton
                variant="outline"
                size="sm"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </QHButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}