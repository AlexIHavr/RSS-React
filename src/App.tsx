import { PureComponent, ReactNode } from 'react';
import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';

import { Search } from './components/search/Search';

export class App extends PureComponent {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    );
  }
}
