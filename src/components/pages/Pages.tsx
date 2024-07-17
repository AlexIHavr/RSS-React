import { SearchParams } from 'api/api.consts';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { Loader } from 'components/loader/Loader';
import { Pagination } from 'components/pagination/Pagination';
import { Results } from 'components/results/Results';
import { getCurrentPage } from 'helpers/getCurrentPage';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { useSearchValue } from 'hooks/useSearchValue';
import { useThemeContext } from 'hooks/useThemeContext';
import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from 'redux/api/api';
import { Theme } from 'utils/context';

import styles from './pages.module.scss';

export const Pages: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useSearchValue();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = useSearchParamsString();
  const { theme } = useThemeContext();

  const currentPage = getCurrentPage(searchParams.get(SearchParams.PAGE));

  const [page, setPage] = useState(currentPage);

  const { data, isFetching } = api.useGetPeopleQuery({ searchValue, page });

  const results = data?.results;

  if (inputRef.current) inputRef.current.value = searchValue;

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

  return (
    <div className={styles.pages + ' ' + (theme === Theme.DARK ? styles.darkTheme : '')}>
      <div className={styles.wrapper} onClick={onCloseDetailsInWrapperHandler}>
        <Header ref={inputRef} onSetSearchValueHandler={onSetSearchValueHandler} />
        <main className={styles.main}>
          {results && <Results results={results} />}
          {data?.count && results?.length && (
            <Pagination count={data.count} page={page} onSetPageHandler={onSetPageHandler} />
          )}
          {results && <Footer results={results} />}
        </main>
        {isFetching && <Loader />}
      </div>
      <Outlet />
    </div>
  );
};
