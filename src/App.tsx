import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { Pages } from 'components/pages/Pages';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Pages />
    </ErrorBoundary>
  );
};
