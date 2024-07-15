import { SearchParams } from 'api/api.consts';
import { getApiItem } from 'api/api.helpers';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ResultsProps } from './results.interfaces';
import styles from './results.module.scss';

export const Results: FC<ResultsProps> = memo(({ results, setDetails, setIsLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailsParams, setDetailsParams] = useState('');

  const currentDetails = searchParams.get(SearchParams.DETAILS);

  const setDetailsHandler = useCallback(
    async (name: string): Promise<void> => {
      setIsLoading(true);

      try {
        const data = await getApiItem(name);

        setDetails(data);
        setDetailsParams(name);
        setSearchParams((prevParams) => {
          prevParams.set(SearchParams.DETAILS, name);
          return prevParams;
        });
      } finally {
        if (results.length) setIsLoading(false);
      }
    },
    [results.length, setDetails, setIsLoading, setSearchParams],
  );

  useEffect(() => {
    if (currentDetails && detailsParams !== currentDetails) {
      setDetailsHandler(currentDetails);
    }
  }, [currentDetails, detailsParams, setDetailsHandler]);

  return (
    <div className={styles.results}>
      {results.map(({ name }) => (
        <div key={name}>
          <h3 className={styles.title} onClick={() => setDetailsHandler(name)}>
            {name}
          </h3>
        </div>
      ))}
    </div>
  );
});
