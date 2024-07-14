import { SearchParams } from 'api/api.consts';
import { getApiData } from 'api/api.helpers';
import { ApiResults } from 'api/api.types';
import { Loader } from 'components/loader/Loader';
import { Results } from 'components/results/Results';
import { getCurrentPage } from 'helpers/getCurrentPage';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocalStorageService } from 'services/localStorage.service';

import styles from './search.module.scss';

export const Search: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = getCurrentPage(searchParams.get(SearchParams.PAGE));

  const [page, setPage] = useState(currentPage);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<ApiResults>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw new Error('crash app');

  const onClickHandler = useCallback(
    async (savedValue?: string | null): Promise<void> => {
      const current = inputRef.current;

      if (!current) return;

      const value = savedValue ?? current.value.trim();

      setIsLoading(true);

      try {
        const { count, results } = await getApiData(value, page);

        if (count && results) {
          setResults(results);
          setCount(count);

          LocalStorageService.saveData('searchValue', value);

          setSearchParams({ [SearchParams.PAGE]: String(page) });

          current.value = value;
        } else {
          setPage(1);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [page, setSearchParams],
  );

  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') return;

    onClickHandler();
  };

  const onCrashAppHandler = (): void => {
    setIsError(true);
  };

  const setPageHandler = useCallback(
    (pageNumber: number): void => {
      setSearchParams({ [SearchParams.PAGE]: String(pageNumber) });
      setPage(pageNumber);
    },
    [setSearchParams],
  );

  useEffect(() => {
    onClickHandler(LocalStorageService.getData('searchValue') ?? '');
  }, [onClickHandler]);

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
      <Results results={results} count={count} page={page} setPageHandler={setPageHandler} />
      {isLoading && <Loader />}
    </>
  );
};
