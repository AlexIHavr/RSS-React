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
import { useSearchValue } from 'hooks/useSearchValue';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './search.module.scss';

export const Search: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useSearchValue();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = getCurrentPage(searchParams.get(SearchParams.PAGE));

  const [page, setPage] = useState(currentPage);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<ApiResults>([]);
  const [details, setDetails] = useState<ApiResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearchHandler = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    const current = inputRef.current;

    if (!current) return;

    try {
      const { count, results } = await getApiData(searchValue, page);

      if (count && results) {
        setResults(results);
        setCount(count);

        current.value = searchValue;
      } else {
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, page]);

  const onSetPageHandler = useCallback(
    (pageNumber: number): void => {
      setPage(pageNumber);
      setSearchParams((prevParams) => {
        prevParams.set(SearchParams.PAGE, String(pageNumber));
        return prevParams;
      });
    },
    [setSearchParams],
  );

  const onCloseDetailsHandler = (): void => {
    setDetails(null);
    setSearchParams((prevParams) => {
      prevParams.set(SearchParams.DETAILS, '');
      return prevParams;
    });
  };

  const onSetSearchValueHandler = useCallback((): void => {
    const current = inputRef.current;

    if (!current) return;

    const value = current.value.trim();
    setSearchValue(value);
    onSetPageHandler(1);
  }, [setSearchValue, onSetPageHandler]);

  useEffect(() => {
    onSearchHandler();
  }, [onSearchHandler]);

  return (
    <div className={styles.pages}>
      <div className={styles.wrapper}>
        <Header ref={inputRef} onSetSearchValueHandler={onSetSearchValueHandler} />
        <main className={styles.main}>
          {results.length ? (
            <>
              <Results results={results} setDetails={setDetails} setIsLoading={setIsLoading} />
              <Pagination count={count} page={page} onSetPageHandler={onSetPageHandler} />
            </>
          ) : (
            <h3>No results</h3>
          )}
        </main>
      </div>
      {details && <Details details={details} onCloseDetailsHandler={onCloseDetailsHandler} />}
      {isLoading && <Loader />}
    </div>
  );
};
