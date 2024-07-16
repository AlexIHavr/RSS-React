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
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
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

      current.value = searchValue;

      if (count && results) {
        setResults(results);
        setCount(count);
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

  const onCloseDetailsHandler = useCallback((): void => {
    setDetails(null);
    setSearchParams((prevParams) => {
      prevParams.set(SearchParams.DETAILS, '');
      return prevParams;
    });
  }, [setSearchParams]);

  const onSetSearchValueHandler = useCallback((): void => {
    const current = inputRef.current;

    if (!current) return;

    const value = current.value.trim();
    setSearchValue(value);
    onSetPageHandler(1);
  }, [setSearchValue, onSetPageHandler]);

  const onCloseDetailsInWrapperHandler = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;

    if (results.find(({ name }) => target.textContent === name)) return;

    onCloseDetailsHandler();
  };

  useEffect(() => {
    onSearchHandler();
  }, [onSearchHandler]);

  return (
    <div className={styles.pages}>
      <div className={styles.wrapper} onClick={onCloseDetailsInWrapperHandler}>
        <Header ref={inputRef} onSetSearchValueHandler={onSetSearchValueHandler} />
        <main className={styles.main}>
          <Results results={results} setDetails={setDetails} setIsLoading={setIsLoading} />
          {!!results.length && (
            <Pagination count={count} page={page} onSetPageHandler={onSetPageHandler} />
          )}
        </main>
      </div>
      {details && <Details details={details} onCloseDetailsHandler={onCloseDetailsHandler} />}
      {isLoading && <Loader />}
    </div>
  );
};
