import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import Link from 'next/link';
import { FC, memo } from 'react';
import { add, remove } from 'reduxToolkit/reducers/select/select.reducer';

import { ResultProps } from './result.interfaces';
import styles from './result.module.scss';

export const Result: FC<ResultProps> = memo(({ name }) => {
  const selectedNames = useAppSelector((state) => state.select.selectedNames);
  const dispatch = useAppDispatch();

  const searchParamsString = useSearchParamsString('people', name);

  const isSelectedName = selectedNames.find((selectedName) => selectedName === name);

  const toggleCheckbox = (): void => {
    if (isSelectedName) {
      dispatch(remove(name));
    } else {
      dispatch(add(name));
    }
  };

  return (
    <div className={styles.result}>
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={toggleCheckbox}
        checked={!!isSelectedName}
      />
      <Link href={searchParamsString} data-testid="result" className={styles.title}>
        {name}
      </Link>
    </div>
  );
});
