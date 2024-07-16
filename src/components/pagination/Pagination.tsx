import { RESULTS_COUNT_ON_PAGE } from 'api/api.consts';
import { FC, MouseEvent, memo } from 'react';

import { PaginationProps } from './pagination.interfaces';
import styles from './pagination.module.scss';

export const Pagination: FC<PaginationProps> = memo(({ page, count, onSetPageHandler }) => {
  const pages = new Array(Math.ceil(count / RESULTS_COUNT_ON_PAGE)).fill(null);

  const goToPage = (event: MouseEvent<HTMLDivElement>, pageNumber: number): void => {
    if (event.currentTarget.classList.contains(styles.active)) return;

    onSetPageHandler(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      {pages.map((_, index) => (
        <div
          key={index}
          className={styles.page + ' ' + (page === index + 1 ? styles.active : '')}
          onClick={(event) => goToPage(event, index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
});
