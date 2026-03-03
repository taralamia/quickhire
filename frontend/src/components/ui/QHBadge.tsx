import React from 'react';
import type { JobType } from '@/types/job';

export interface QHBadgeProps {
  variant: JobType;
  children: React.ReactNode;
  className?: string;
}

export function QHBadge({ variant, children, className = '' }: QHBadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded text-body-sm font-medium font-body';

  const variantClasses: Record<JobType, string> = {
    'Full-time': 'bg-accent-green/10 text-accent-green',
    'Part-time': 'bg-accent-yellow/10 text-accent-yellow',
    'Remote': 'bg-accent-blue/10 text-accent-blue',
    'Contract': 'bg-accent-red/10 text-accent-red',
    'Internship': 'bg-accent-purple/10 text-accent-purple',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return <span className={classes}>{children}</span>;
}
