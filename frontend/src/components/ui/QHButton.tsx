import React from 'react';

export interface QHButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function QHButton({
  variant,
  size,
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}: QHButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 font-body';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50',
    secondary: 'bg-secondary text-primary hover:bg-secondary/90 disabled:bg-secondary/50',
    outline:
      'border-2 border-primary text-primary hover:bg-tertiary disabled:border-primary/50 disabled:text-primary/50',
    ghost: 'text-primary hover:bg-tertiary disabled:text-primary/50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
