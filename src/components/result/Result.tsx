import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { add, remove } from 'redux/reducers/select.reducer';

import { ResultProps } from './result.interfaces';
import styles from './result.module.scss';

export const Result: FC<ResultProps> = memo(({ name }) => {
  const selectedNames = useAppSelector((state) => state.select.selectedNames);
  const dispatch = useAppDispatch();

  const searchParamsString = useSearchParamsString(name);

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
        onClick={toggleCheckbox}
        checked={!!isSelectedName}
      />
      <NavLink to={searchParamsString} data-testid="result" className={styles.title}>
        {name}
      </NavLink>
    </div>
  );
});
