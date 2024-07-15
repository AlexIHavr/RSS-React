import { KeyboardEvent, forwardRef, memo, useState } from 'react';

import { HeaderProps } from './header.interfaces';
import styles from './header.module.scss';

export const Header = memo(
  forwardRef<HTMLInputElement, HeaderProps>(({ onSetSearchValueHandler }, ref) => {
    const [isError, setIsError] = useState<boolean>(false);

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
        <button className={styles.searchButton} onClick={onSetSearchValueHandler}>
          Search
        </button>
        <button className={styles.crashButton} onClick={onCrashAppHandler}>
          Crash app
        </button>
      </header>
    );
  }),
);
