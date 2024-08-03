import { ErrorBoundary } from 'components/errorBoundary/ErrorBoundary';
import { Pages } from 'components/pages/Pages';
import { FC, ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';
import { Theme, ThemeContext } from 'utils/context';

export const App: FC<{ children?: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.LIGHT);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Pages>{children}</Pages>
        </ThemeContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};
