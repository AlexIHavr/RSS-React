import { RESULTS_COUNT_ON_PAGE } from 'api/api.consts';
import { FC, memo } from 'react';

import { PaginationProps } from './pagination.interfaces';
import styles from './pagination.module.scss';

export const Pagination: FC<PaginationProps> = memo(({ page, count, onSetPageHandler }) => {
  const pages = new Array(Math.ceil(count / RESULTS_COUNT_ON_PAGE)).fill(null);

  return (
    <div className={styles.pagination}>
      {pages.map((_, index) => (
        <div
          key={index}
          className={styles.page + ' ' + (page === index + 1 ? styles.active : '')}
          onClick={() => onSetPageHandler(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
});
