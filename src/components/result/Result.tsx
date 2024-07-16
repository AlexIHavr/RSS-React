import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ResultProps } from './result.interfaces';
import styles from './result.module.scss';

export const Result: FC<ResultProps> = memo(({ name }) => {
  return (
    <div>
      <NavLink to={import.meta.env.BASE_URL + name} data-testid="result" className={styles.title}>
        {name}
      </NavLink>
    </div>
  );
});
