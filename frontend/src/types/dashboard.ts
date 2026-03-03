export type MetricType = 'count' | 'percentage' | 'trend';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface DashboardMetric {
  name: string;
  value: number;
  type: MetricType;
  trend?: {
    direction: TrendDirection;
    value: number;
  };
}

export interface ApplicationStage {
  stage: string;
  count: number;
  color: string;
}

export interface ApplicantSummaryData {
  totalApplicants: number;
  stages: ApplicationStage[];
}
