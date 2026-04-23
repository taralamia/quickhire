
export interface QHIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function QHIcon({ name, size = 'md', className = '' }: QHIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const classes = `${sizeClasses[size]} ${className}`.trim();

  return (
    <img
      src={`/assets/icons/${name}.svg`}
      alt={name}
      className={classes}
      aria-hidden="true"
      onError={(e) => {
        // Fallback to a simple colored square if icon fails to load
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
