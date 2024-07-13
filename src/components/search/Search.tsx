import { getApiResults } from 'api/api.helpers';
import { ApiResults } from 'api/api.types';
import { Loader } from 'components/loader/Loader';
import { Results } from 'components/results/Results';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { LocalStorageService } from 'services/localStorage.service';

import styles from './search.module.scss';

export const Search: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<ApiResults>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw new Error('crash app');

  const onClickHandler = async (savedValue?: string | null): Promise<void> => {
    const current = inputRef.current;

    if (!current) return;

    const value = savedValue ?? current.value.trim();

    setIsLoading(true);

    try {
      const results = await getApiResults(value);
      setResults(results);

      LocalStorageService.saveData('searchValue', value);

      current.value = value;
    } finally {
      setIsLoading(false);
    }
  };

  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') return;

    onClickHandler();
  };

  const onCrashAppHandler = (): void => {
    setIsError(true);
  };

  useEffect(() => {
    onClickHandler(LocalStorageService.getData('searchValue'));
  }, []);

  return (
    <>
      <header className={styles.header}>
        <input ref={inputRef} type="text" placeholder="Type text..." onKeyUp={onEnterHandler} />
        <button className={styles.searchButton} onClick={() => onClickHandler()}>
          Search
        </button>
        <button className={styles.crashButton} onClick={onCrashAppHandler}>
          Crash app
        </button>
      </header>
      <Results results={results} />
      {isLoading && <Loader />}
    </>
  );
};
