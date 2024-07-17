import { Result } from 'components/result/Result';
import { FC, memo } from 'react';

import { ResultsProps } from './results.interfaces';
import styles from './results.module.scss';

export const Results: FC<ResultsProps> = memo(({ results }) => {
  return (
    <div className={styles.results}>
      {results?.length ? (
        results.map(({ name }) => <Result key={name} name={name} />)
      ) : (
        <h3 data-testid="no-results">No results</h3>
      )}
    </div>
  );
});
