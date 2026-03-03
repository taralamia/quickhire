import React from 'react';

export interface QHCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

export function QHCard({
  children,
  onClick,
  className = '',
  hoverable = false,
}: QHCardProps) {
  const baseClasses = 'bg-white rounded-xl p-6 border border-neutral-300 transition-all duration-200';

  const hoverClasses = hoverable
    ? 'hover:shadow-lg hover:border-primary/20 cursor-pointer'
    : '';

  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`.trim();

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
