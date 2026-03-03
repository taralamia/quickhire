import type { DashboardMetric } from '@/types';
import { QHCard } from '@/components/ui/QHCard';

export interface DashboardStatsProps {
  metrics: DashboardMetric[];
}

export function DashboardStats({ metrics }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <StatCard key={index} metric={metric} />
      ))}
    </div>
  );
}

interface StatCardProps {
  metric: DashboardMetric;
}

function StatCard({ metric }: StatCardProps) {
  const formatValue = (value: number, type: DashboardMetric['type']): string => {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'count':
        return value.toLocaleString();
      case 'trend':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getTrendIcon = (direction?: DashboardMetric['trend']) => {
    if (!direction) return null;
    
    switch (direction.direction) {
      case 'up':
        return (
          <svg
            className="w-4 h-4 text-accent-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-testid="trend-up-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        );
      case 'down':
        return (
          <svg
            className="w-4 h-4 text-accent-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-testid="trend-down-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        );
      case 'neutral':
        return (
          <svg
            className="w-4 h-4 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-testid="trend-neutral-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTrendColor = (direction?: DashboardMetric['trend']) => {
    if (!direction) return 'text-neutral-600';
    
    switch (direction.direction) {
      case 'up':
        return 'text-accent-green';
      case 'down':
        return 'text-accent-red';
      case 'neutral':
        return 'text-neutral-500';
      default:
        return 'text-neutral-600';
    }
  };

  return (
    <QHCard className="flex flex-col gap-3">
      {/* Metric Name */}
      <h3
        className="text-body-sm font-medium font-body text-neutral-600"
        data-testid="metric-name"
      >
        {metric.name}
      </h3>

      {/* Metric Value */}
      <div className="flex items-end justify-between">
        <span
          className="text-[32px] font-semibold font-body text-neutral-900"
          data-testid="metric-value"
        >
          {formatValue(metric.value, metric.type)}
        </span>

        {/* Visual Indicator (Trend) */}
        {metric.trend && (
          <div
            className="flex items-center gap-1"
            data-testid="visual-indicator"
          >
            {getTrendIcon(metric.trend)}
            <span
              className={`text-body-sm font-medium font-body ${getTrendColor(
                metric.trend
              )}`}
              data-testid="trend-value"
            >
              {metric.trend.value}%
            </span>
          </div>
        )}
      </div>
    </QHCard>
  );
}
