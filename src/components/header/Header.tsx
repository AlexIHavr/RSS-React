import { useThemeContext } from 'hooks/useThemeContext';
import { KeyboardEvent, forwardRef, memo, useState } from 'react';
import { Theme } from 'utils/context';

import { HeaderProps } from './header.interfaces';
import styles from './header.module.scss';

export const Header = memo(
  forwardRef<HTMLInputElement, HeaderProps>(({ onSetSearchValueHandler }, ref) => {
    const [isError, setIsError] = useState<boolean>(false);
    const { theme, setTheme } = useThemeContext();

    if (isError) throw new Error('crash app');

    const onCrashAppHandler = (): void => {
      setIsError(true);
    };

    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key !== 'Enter') return;

      onSetSearchValueHandler();
    };

    return (
      <header className={styles.header}>
        <input ref={ref} type="text" placeholder="Type text..." onKeyUp={onEnterHandler} />
        <div className={styles.headerButtons}>
          <button className={styles.searchButton} onClick={onSetSearchValueHandler}>
            Search
          </button>
          <button className={styles.crashButton} onClick={onCrashAppHandler}>
            Crash app
          </button>
          <button
            className={styles.toggleThemeBtn}
            onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
          >
            {theme} Theme
          </button>
        </div>
      </header>
    );
  }),
);
