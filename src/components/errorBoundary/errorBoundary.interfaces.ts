import { ReactNode } from 'react';

export interface ErrorBoundaryState {
  errorMessage: string | null;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
}
