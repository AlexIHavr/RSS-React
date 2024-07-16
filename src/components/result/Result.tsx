import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ResultProps } from './result.interfaces';
import styles from './result.module.scss';

export const Result: FC<ResultProps> = memo(({ name }) => {
  const searchParamsString = useSearchParamsString(name);

  return (
    <div>
      <NavLink to={searchParamsString} data-testid="result" className={styles.title}>
        {name}
      </NavLink>
    </div>
  );
});
