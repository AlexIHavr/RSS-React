import { SearchParams } from 'api/api.consts';
import { getApiData } from 'api/api.helpers';
import { ApiResult } from 'api/api.interfaces';
import { ApiResults } from 'api/api.types';
import { Details } from 'components/details/Details';
import { Header } from 'components/header/Header';
import { Loader } from 'components/loader/Loader';
import { Pagination } from 'components/pagination/Pagination';
import { Results } from 'components/results/Results';
import { getCurrentPage } from 'helpers/getCurrentPage';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
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

  const onSearchHandler = useCallback(
    async (currentPage: number, savedValue?: string | null): Promise<void> => {
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
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const setPageHandler = useCallback(
    (pageNumber: number): void => {
      setPage(pageNumber);
      setSearchParams((prevParams) => {
        prevParams.set(SearchParams.PAGE, String(pageNumber));
        return prevParams;
      });
      onSearchHandler(pageNumber);
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
      onSearchHandler(currentPage, LocalStorageService.getData('searchValue') ?? '');
    }
  }, [currentPage, page, onSearchHandler]);

  return (
    <div className={styles.pages}>
      <div className={styles.wrapper}>
        <Header ref={inputRef} page={page} onSearchHandler={onSearchHandler} />
        <main className={styles.main}>
          {results.length ? (
            <>
              <Results results={results} setDetails={setDetails} setIsLoading={setIsLoading} />
              <Pagination count={count} page={page} setPageHandler={setPageHandler} />
            </>
          ) : (
            <h3>No results</h3>
          )}
        </main>
      </div>
      {details && <Details details={details} closeDetailsHandler={closeDetailsHandler} />}
      {isLoading && <Loader />}
    </div>
  );
};
