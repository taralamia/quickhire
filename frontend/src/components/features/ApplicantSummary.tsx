import type { ApplicantSummaryData } from '@/types/dashboard';

export interface ApplicantSummaryProps {
  data: ApplicantSummaryData;
  className?: string;
}

export function ApplicantSummary({ data, className = '' }: ApplicantSummaryProps) {
  const { totalApplicants, stages } = data;

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-neutral-900 mb-6">
        Applicant Summary
      </h3>
      
      <div className="space-y-4">
        {stages.map((stage) => {
          const percentage = totalApplicants > 0 
            ? Math.round((stage.count / totalApplicants) * 100) 
            : 0;

          return (
            <div key={stage.stage} data-testid="application-stage">
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="text-body text-neutral-700 font-medium"
                  data-testid="stage-name"
                >
                  {stage.stage}
                </span>
                <span 
                  className="text-body-sm text-neutral-600"
                  data-testid="stage-count"
                >
                  {stage.count} ({percentage}%)
                </span>
              </div>
              
              <div 
                className="w-full bg-neutral-300 rounded-full h-2 overflow-hidden"
                data-testid="progress-bar-container"
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: stage.color,
                  }}
                  data-testid="progress-bar"
                  aria-label={`${stage.stage}: ${percentage}%`}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          );
        })}
      </div>

      {totalApplicants > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-300">
          <div className="flex justify-between items-center">
            <span className="text-body text-neutral-700 font-medium">
              Total Applicants
            </span>
            <span 
              className="text-body font-semibold text-neutral-900"
              data-testid="total-applicants"
            >
              {totalApplicants}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
