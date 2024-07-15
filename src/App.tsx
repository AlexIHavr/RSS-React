import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { Search } from 'components/search/Search';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
};
