import { SearchParams } from 'api/api.consts';
import { getApiData } from 'api/api.helpers';
import { ApiResult } from 'api/api.interfaces';
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

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<ApiResults>([]);
  const [details, setDetails] = useState<ApiResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw new Error('crash app');

  const onSearchHandler = useCallback(
    async (savedValue?: string | null, currentPage: number = page): Promise<void> => {
      const current = inputRef.current;

      if (!current) return;

      const value = savedValue ?? current.value.trim();

      setIsLoading(true);

      try {
        const { count, results } = await getApiData(value, currentPage);

        if (count && results) {
          setResults(results);
          setCount(count);

          LocalStorageService.saveData('searchValue', value);

          current.value = value;
        } else {
          setPage(1);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [page],
  );

  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') return;

    onSearchHandler();
  };

  const onCrashAppHandler = (): void => {
    setIsError(true);
  };

  const setPageHandler = useCallback(
    (pageNumber: number): void => {
      setPage(pageNumber);
      setSearchParams((prevParams) => {
        prevParams.set(SearchParams.PAGE, String(pageNumber));
        return prevParams;
      });
      onSearchHandler();
    },
    [onSearchHandler, setSearchParams],
  );

  const closeDetailsHandler = (): void => {
    setDetails(null);
    setSearchParams((prevParams) => {
      prevParams.set(SearchParams.DETAILS, '');
      return prevParams;
    });
  };

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
      onSearchHandler(LocalStorageService.getData('searchValue') ?? '', currentPage);
    }
  }, [currentPage, page, onSearchHandler]);

  return (
    <div className={styles.pages}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <input ref={inputRef} type="text" placeholder="Type text..." onKeyUp={onEnterHandler} />
          <button className={styles.searchButton} onClick={() => onSearchHandler()}>
            Search
          </button>
          <button className={styles.crashButton} onClick={onCrashAppHandler}>
            Crash app
          </button>
        </header>
        <Results
          results={results}
          count={count}
          page={page}
          setPageHandler={setPageHandler}
          setDetails={setDetails}
          setIsLoading={setIsLoading}
        />
      </div>
      {details && (
        <div className={styles.details}>
          <h2>Details:</h2>
          <span>Name: {details.name}</span>
          <span>Mass: {details.mass}</span>
          <span>Height: {details.height}</span>
          <span>Eye color: {details.eye_color}</span>
          <span>Hair color: {details.hair_color}</span>
          <span>Skin color: {details.skin_color}</span>
          <button onClick={closeDetailsHandler}>Close</button>
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
