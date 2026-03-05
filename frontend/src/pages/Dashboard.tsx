import { DashboardStats } from '@/components/features/DashboardStats';
import { ApplicantSummary } from '@/components/features/ApplicantSummary';
import { JobUpdates } from '@/components/features/JobUpdates';
import type { DashboardMetric } from '@/types/dashboard';

export function Dashboard() {
  const metrics: DashboardMetric[] = [
    {
      name: 'Total Jobs Posted',
      value: 24,
      type: 'count',
      trend: { direction: 'up', value: 12 }
    },
    {
      name: 'Active Applications',
      value: 156,
      type: 'count',
      trend: { direction: 'up', value: 8 }
    },
    {
      name: 'Interview Rate',
      value: 42,
      type: 'percentage',
      trend: { direction: 'up', value: 5 }
    },
    {
      name: 'Hire Rate',
      value: 18,
      type: 'percentage',
      trend: { direction: 'neutral', value: 0 }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-h2 font-heading font-semibold text-neutral-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-body-lg text-neutral-600">
          Welcome back! Here's what's happening with your jobs today.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats metrics={metrics} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applicant Summary */}
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Applicant Summary</h2>
          <ApplicantSummary 
            data={{
              totalApplicants: 156,
              stages: [
                { stage: 'Applied', count: 45, color: '#4640DE' },
                { stage: 'Screening', count: 28, color: '#26A4FF' },
                { stage: 'Interview', count: 18, color: '#56CDAD' },
                { stage: 'Offer', count: 8, color: '#FFB836' },
                { stage: 'Hired', count: 5, color: '#7B61FF' }
              ]
            }}
          />
        </div>

        {/* Job Updates */}
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
          <JobUpdates 
            updates={[
              {
                id: '1',
                jobTitle: 'Senior Product Designer',
                action: 'application_received',
                timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
                details: 'New application received'
              },
              {
                id: '2', 
                jobTitle: 'Frontend Developer',
                action: 'posted',
                timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
                details: 'Job posted successfully'
              },
              {
                id: '3',
                jobTitle: 'Product Manager',
                action: 'closed',
                timestamp: new Date(Date.now() - 5 * 60 * 60000), // 5 hours ago
                details: 'Position filled'
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
