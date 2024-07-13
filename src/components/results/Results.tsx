import { FC } from 'react';

import { ResultsProps } from './results.interfaces';
import styles from './results.module.scss';

export const Results: FC<ResultsProps> = ({ results }) => {
  return (
    <main className={styles.results}>
      {results.length ? (
        results.map(({ episode_id, title, opening_crawl }) => (
          <div key={episode_id}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{opening_crawl}</p>
          </div>
        ))
      ) : (
        <h3>No results</h3>
      )}
    </main>
  );
};
