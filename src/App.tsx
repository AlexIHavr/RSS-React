import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { FC } from 'react';

import { Search } from './components/search/Search';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
};
