import React from 'react';

export interface QHInputProps {
  type: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function QHInput({
  type,
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  disabled = false,
  name,
  id,
}: QHInputProps) {
  const baseClasses =
    'w-full px-4 py-3 rounded-lg border font-body text-body transition-colors duration-200 focus:outline-none';

  const stateClasses = error
    ? 'border-accent-red focus:border-accent-red focus:ring-2 focus:ring-accent-red/20'
    : 'border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20';

  const disabledClasses = disabled
    ? 'bg-neutral-300/30 text-neutral-500 cursor-not-allowed'
    : 'bg-white text-neutral-900';

  const iconPaddingClass = icon ? 'pl-12' : '';

  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${iconPaddingClass} ${className}`.trim();

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        id={id}
        name={name}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-body-sm text-accent-red"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
