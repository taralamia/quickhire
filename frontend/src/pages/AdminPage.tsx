import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QHButton } from '@/components/ui/QHButton';
import { QHInput } from '@/components/ui/QHInput';

export function AdminPage() {
  const navigate = useNavigate();

  // Temporary frontend-only job list
  const [jobs, setJobs] = useState<any[]>([]);
  const [newJobTitle, setNewJobTitle] = useState('');

  const handleAddJob = () => {
    if (!newJobTitle.trim()) return;
    const newJob = { id: Date.now().toString(), title: newJobTitle }; // temporary ID
    setJobs([newJob, ...jobs]);
    setNewJobTitle('');
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        {/* Add Job */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add Job</h2>
          <div className="flex gap-2">
            <QHInput
              type="text"
              placeholder="Job title"
              value={newJobTitle}
              onChange={(value) => setNewJobTitle(value)}
            />
            <QHButton variant="primary" size="md" onClick={handleAddJob}>Add</QHButton>
          </div>
        </div>

        {/* Job List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Jobs</h2>
          {jobs.length === 0 ? (
            <p>No jobs added yet.</p>
          ) : (
            <ul className="space-y-2">
              {jobs.map(job => (
                <li key={job.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span>{job.title}</span>
                  <QHButton variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                    Delete
                  </QHButton>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Temporary back button to navigate elsewhere */}
        <div className="mt-8">
          <QHButton variant="outline" size="md" onClick={() => navigate(-1)}>Back</QHButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}