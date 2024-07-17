import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';
import { removeAll } from 'redux/reducers/select.reducer';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  const selectedNames = useAppSelector((state) => state.select.selectedNames);
  const dispatch = useAppDispatch();

  return (
    !!selectedNames.length && (
      <div className={styles.footer}>
        <>
          <h3>{selectedNames.length} are selected</h3>
          <div className={styles.footerButtons}>
            <button onClick={() => dispatch(removeAll())}>Unselect all</button>
            <button>Download</button>
          </div>
        </>
      </div>
    )
  );
};
