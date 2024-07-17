import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { Pages } from 'components/pages/Pages';
import { FC, useState } from 'react';
import { Theme, ThemeContext } from 'utils/context';

export const App: FC = () => {
  const [theme, setTheme] = useState(Theme.LIGHT);

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Pages />
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
};
