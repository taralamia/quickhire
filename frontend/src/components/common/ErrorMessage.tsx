import React from 'react';
import { QHButton } from '../ui/QHButton';

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-4">
      <p className="text-accent-red text-body">{message}</p>
      {onRetry && (
        <QHButton variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Retry
        </QHButton>
      )}
    </div>
  );
}
