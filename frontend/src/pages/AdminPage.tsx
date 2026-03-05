import { useState } from 'react';
import { QHButton } from '@/components/ui/QHButton';
import { QHInput } from '@/components/ui/QHInput';

export function AdminPage() {

  // temporary frontend job list
  const [jobs, setJobs] = useState<{ id: string; title: string }[]>([]);
  const [newJobTitle, setNewJobTitle] = useState('');

  const handleAddJob = () => {
    if (!newJobTitle.trim()) return;

    const newJob = {
      id: Date.now().toString(),
      title: newJobTitle
    };

    setJobs([newJob, ...jobs]);
    setNewJobTitle('');
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="max-w-5xl">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">
        Admin Panel
      </h1>

      {/* Add Job Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Add Job
        </h2>

        <div className="flex gap-3">
          <QHInput
            type="text"
            placeholder="Job title"
            value={newJobTitle}
            onChange={(value) => setNewJobTitle(value)}
          />

          <QHButton
            variant="primary"
            size="md"
            onClick={handleAddJob}
          >
            Add
          </QHButton>
        </div>
      </div>

      {/* Job List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Current Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-neutral-500">
            No jobs added yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {jobs.map(job => (
              <li
                key={job.id}
                className="flex justify-between items-center border border-neutral-200 p-3 rounded-md"
              >
                <span>{job.title}</span>

                <QHButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete
                </QHButton>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}