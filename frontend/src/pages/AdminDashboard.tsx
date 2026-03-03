import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QHButton } from '@/components/ui/QHButton';
import { QHInput } from '@/components/ui/QHInput';
import { QHBadge } from '@/components/ui/QHBadge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { jobService } from '@/services/jobService';
import type { Job, JobType, JobCategory } from '@/types/job';

export function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
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
      const data = await jobService.searchJobs({});
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
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
      // TODO: Call backend API to create job
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and reload jobs
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
      setFormErrors({ submit: 'Failed to create job. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      // TODO: Call backend API to delete job
      console.log('Deleting job:', jobId);
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadJobs();
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const toggleJobType = (type: JobType) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
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
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Add New Job</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-700 font-medium mb-2">
                    Job Title <span className="text-accent-red">*</span>
                  </label>
                  <QHInput
                    type="text"
                    placeholder="e.g. Senior Product Designer"
                    value={formData.title}
                    onChange={(value) => setFormData({ ...formData, title: value })}
                    error={formErrors.title}
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-2">
                    Company Name <span className="text-accent-red">*</span>
                  </label>
                  <QHInput
                    type="text"
                    placeholder="e.g. Nomad"
                    value={formData.companyName}
                    onChange={(value) => setFormData({ ...formData, companyName: value })}
                    error={formErrors.companyName}
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-2">
                    Location <span className="text-accent-red">*</span>
                  </label>
                  <QHInput
                    type="text"
                    placeholder="e.g. Paris, France"
                    value={formData.location}
                    onChange={(value) => setFormData({ ...formData, location: value })}
                    error={formErrors.location}
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-2">
                    Category <span className="text-accent-red">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  {formErrors.category && (
                    <p className="text-accent-red text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Job Types <span className="text-accent-red">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'] as JobType[]).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.jobTypes.includes(type)}
                        onChange={() => toggleJobType(type)}
                        className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                      />
                      <span className="text-neutral-700">{type}</span>
                    </label>
                  ))}
                </div>
                {formErrors.jobTypes && (
                  <p className="text-accent-red text-sm mt-1">{formErrors.jobTypes}</p>
                )}
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Description <span className="text-accent-red">*</span>
                </label>
                <textarea
                  placeholder="Describe the role, responsibilities, and what makes it exciting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                {formErrors.description && (
                  <p className="text-accent-red text-sm mt-1">{formErrors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">
                  Requirements (one per line)
                </label>
                <textarea
                  placeholder="3+ years of experience&#10;Strong portfolio&#10;Excellent communication skills"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
                  {submitting ? 'Creating...' : 'Create Job'}
                </QHButton>
                <QHButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </QHButton>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <ErrorMessage message={error} onRetry={loadJobs} />
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-neutral-600 text-lg">No jobs yet. Add your first job listing!</p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              All Jobs ({jobs.length})
            </h2>
            
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg p-6 shadow-sm flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-12 h-12 rounded object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{job.title}</h3>
                      <p className="text-neutral-700 mb-2">{job.company.name}</p>
                      <p className="text-neutral-600 text-sm mb-3">📍 {job.location}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.jobTypes.map((type) => (
                          <QHBadge key={type} variant={type.toLowerCase().replace('-', '') as any}>
                            {type}
                          </QHBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <QHButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </QHButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
