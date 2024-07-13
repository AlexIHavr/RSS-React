import { RESULTS_COUNT_ON_PAGE } from 'api/api.consts';
import { FC, memo } from 'react';

import { ResultsProps } from './results.interfaces';
import styles from './results.module.scss';

export const Results: FC<ResultsProps> = memo(({ results, count, page, setPageHandler }) => {
  const pages = new Array(Math.ceil(count / RESULTS_COUNT_ON_PAGE)).fill(null);

  return (
    <main className={styles.main}>
      {results.length ? (
        <>
          <div className={styles.results}>
            {results.map(({ name }) => (
              <div key={name}>
                <h3 className={styles.title}>{name}</h3>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {pages.map((_, index) => (
              <div
                key={index}
                className={styles.page + ' ' + (page === index + 1 ? styles.active : '')}
                onClick={() => setPageHandler(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>No results</h3>
      )}
    </main>
  );
});
