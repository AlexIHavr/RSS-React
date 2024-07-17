import { TYPE_API_DATA } from 'api/api.consts';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';
import { CSVLink } from 'react-csv';
import { removeAll } from 'redux/reducers/select.reducer';

import { FooterProps } from './footer.interfaces';
import styles from './footer.module.scss';

export const Footer: FC<FooterProps> = ({ results }) => {
  const selectedNames = useAppSelector((state) => state.select.selectedNames);
  const dispatch = useAppDispatch();

  const csvData = results?.filter(({ name }) => selectedNames.includes(name)) || [];

  return (
    !!selectedNames.length && (
      <div className={styles.footer}>
        <>
          <h3>{selectedNames.length} are selected</h3>
          <div className={styles.footerButtons}>
            <button onClick={() => dispatch(removeAll())}>Unselect all</button>
            <CSVLink data={csvData} filename={`${selectedNames.length}_${TYPE_API_DATA}.csv`}>
              <button>Download</button>
            </CSVLink>
          </div>
        </>
      </div>
    )
  );
};
