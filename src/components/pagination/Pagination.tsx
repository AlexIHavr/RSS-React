import { RESULTS_COUNT_ON_PAGE } from 'api/api.consts';
import { useThemeContext } from 'hooks/useThemeContext';
import { FC, MouseEvent, memo } from 'react';
import { Theme } from 'utils/context';

import { PaginationProps } from './pagination.interfaces';
import styles from './pagination.module.scss';

export const Pagination: FC<PaginationProps> = memo(({ page, count, onSetPageHandler }) => {
  const pages = new Array(Math.ceil(count / RESULTS_COUNT_ON_PAGE)).fill(null);
  const { theme } = useThemeContext();

  const goToPage = (event: MouseEvent<HTMLButtonElement>, pageNumber: number): void => {
    if (event.currentTarget.classList.contains(styles.active)) return;

    onSetPageHandler(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      {pages.map((_, index) => (
        <button
          key={index}
          className={
            styles.page +
            ' ' +
            (page === index + 1 ? styles.active : '') +
            ' ' +
            (theme === Theme.DARK ? styles.darkBtn : '')
          }
          onClick={(event) => goToPage(event, index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
});
