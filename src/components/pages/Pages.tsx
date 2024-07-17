import { SearchParams } from 'api/api.consts';
import { getApiData } from 'api/api.helpers';
import { ApiResults } from 'api/api.types';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { Loader } from 'components/loader/Loader';
import { Pagination } from 'components/pagination/Pagination';
import { Results } from 'components/results/Results';
import { getCurrentPage } from 'helpers/getCurrentPage';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { useSearchValue } from 'hooks/useSearchValue';
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './pages.module.scss';

export const Pages: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useSearchValue();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = useSearchParamsString();

  const currentPage = getCurrentPage(searchParams.get(SearchParams.PAGE));

  const [page, setPage] = useState(currentPage);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<ApiResults>([]);
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

  const onSetSearchValueHandler = useCallback((): void => {
    const current = inputRef.current;

    if (!current) return;

    const value = current.value.trim();
    setSearchValue(value);
    onSetPageHandler(1);
  }, [setSearchValue, onSetPageHandler]);

  const onCloseDetailsInWrapperHandler = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;

    if (target.classList.contains(styles.main) || target.classList.contains(styles.wrapper)) {
      navigate(searchParamsString);
    }
  };

  useEffect(() => {
    onSearchHandler();
  }, [onSearchHandler]);

  return (
    <div className={styles.pages}>
      <div className={styles.wrapper} onClick={onCloseDetailsInWrapperHandler}>
        <Header ref={inputRef} onSetSearchValueHandler={onSetSearchValueHandler} />
        <main className={styles.main}>
          <Results results={results} />
          {!!results.length && (
            <Pagination count={count} page={page} onSetPageHandler={onSetPageHandler} />
          )}
          <Footer results={results} />
        </main>
        {isLoading && <Loader />}
      </div>
      <Outlet />
    </div>
  );
};
