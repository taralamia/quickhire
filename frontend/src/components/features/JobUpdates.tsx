import { QHCard } from '@/components/ui/QHCard';

export interface JobUpdate {
  id: string;
  jobTitle: string;
  action: 'posted' | 'updated' | 'closed' | 'application_received';
  timestamp: Date;
  details?: string;
}

export interface JobUpdatesProps {
  updates: JobUpdate[];
  className?: string;
}

export function JobUpdates({ updates, className = '' }: JobUpdatesProps) {
  const getActionText = (action: JobUpdate['action']): string => {
    switch (action) {
      case 'posted':
        return 'Posted';
      case 'updated':
        return 'Updated';
      case 'closed':
        return 'Closed';
      case 'application_received':
        return 'New Application';
      default:
        return 'Activity';
    }
  };

  const getActionColor = (action: JobUpdate['action']): string => {
    switch (action) {
      case 'posted':
        return 'text-accent-green';
      case 'updated':
        return 'text-accent-blue';
      case 'closed':
        return 'text-neutral-600';
      case 'application_received':
        return 'text-primary';
      default:
        return 'text-neutral-700';
    }
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  if (updates.length === 0) {
    return (
      <QHCard className={className}>
        <div className="p-6">
          <h3 className="text-[20px] font-semibold font-body text-neutral-900 mb-4">
            Job Updates
          </h3>
          <p className="text-body text-neutral-600 font-body text-center py-8">
            No recent activity
          </p>
        </div>
      </QHCard>
    );
  }

  return (
    <QHCard className={className}>
      <div className="p-6">
        <h3 className="text-[20px] font-semibold font-body text-neutral-900 mb-4">
          Job Updates
        </h3>
        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="flex items-start gap-3 pb-4 border-b border-neutral-300 last:border-b-0 last:pb-0"
              data-testid="job-update-item"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-body-sm font-semibold font-body ${getActionColor(update.action)}`}
                    data-testid="update-action"
                  >
                    {getActionText(update.action)}
                  </span>
                  <span className="text-body-sm text-neutral-500 font-body">
                    •
                  </span>
                  <span
                    className="text-body-sm text-neutral-500 font-body"
                    data-testid="update-timestamp"
                  >
                    {formatTimestamp(update.timestamp)}
                  </span>
                </div>
                <p
                  className="text-body text-neutral-900 font-body font-medium"
                  data-testid="update-job-title"
                >
                  {update.jobTitle}
                </p>
                {update.details && (
                  <p
                    className="text-body-sm text-neutral-600 font-body mt-1"
                    data-testid="update-details"
                  >
                    {update.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </QHCard>
  );
}
