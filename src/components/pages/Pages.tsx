import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { Loader } from 'components/loader/Loader';
import { Pagination } from 'components/pagination/Pagination';
import { Results } from 'components/results/Results';
import { getCurrentPage } from 'helpers/getCurrentPage';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { useSearchValue } from 'hooks/useSearchValue';
import { useThemeContext } from 'hooks/useThemeContext';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useCallback, useRef } from 'react';
import { api } from 'reduxToolkit/api/api';
import { set } from 'reduxToolkit/reducers/page/page.reducer';
import { Theme } from 'utils/context';

import styles from './pages.module.scss';

export const Pages: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [searchValue, setSearchValue] = useSearchValue();
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = useSearchParamsString();
  const { theme } = useThemeContext();

  const currentPage = getCurrentPage(null);

  const page = useAppSelector((state) => state.page.currentPage) ?? currentPage;
  const dispatch = useAppDispatch();

  const { data, isFetching } = api.useGetPeopleQuery({ searchValue, page });

  const results = data?.results;

  if (inputRef.current) inputRef.current.value = searchValue;

  const onSetPageHandler = useCallback(
    (pageNumber: number): void => {
      dispatch(set(pageNumber));
      // setSearchParams((prevParams) => {
      //   prevParams.set(SearchParams.PAGE, String(pageNumber));
      //   return prevParams;
      // });
    },
    [dispatch],
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
      router.push(searchParamsString);
    }
  };

  return (
    <div className={styles.pages + ' ' + (theme === Theme.DARK ? styles.darkTheme : '')}>
      <div className={styles.wrapper} onClick={onCloseDetailsInWrapperHandler}>
        <Header ref={inputRef} onSetSearchValueHandler={onSetSearchValueHandler} />
        <main className={styles.main}>
          {results && <Results results={results} />}
          {data?.count && results?.length && (
            <Pagination page={page} count={data.count} onSetPageHandler={onSetPageHandler} />
          )}
          {results && <Footer results={results} />}
        </main>
        {isFetching && <Loader />}
      </div>
      {/* <Outlet /> */}
    </div>
  );
};
