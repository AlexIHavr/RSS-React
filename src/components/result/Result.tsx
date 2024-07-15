import { FC, memo } from 'react';

import { ResultProps } from './result.interfaces';
import styles from './result.module.scss';

export const Result: FC<ResultProps> = memo(({ name, setSearchDetailsHandler }) => {
  return (
    <div>
      <h3
        data-testid="result"
        className={styles.title}
        onClick={() => setSearchDetailsHandler(name)}
      >
        {name}
      </h3>
    </div>
  );
});
