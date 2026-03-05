// PageWrapper.tsx
// PageWrapper.tsx
import type { ReactNode } from 'react';
import { Header } from './Header';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}