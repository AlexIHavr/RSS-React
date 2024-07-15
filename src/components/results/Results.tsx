import { SearchParams } from 'api/api.consts';
import { getApiItem } from 'api/api.helpers';
import { Result } from 'components/result/Result';
import { FC, memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ResultsProps } from './results.interfaces';
import styles from './results.module.scss';

export const Results: FC<ResultsProps> = memo(({ results, setDetails, setIsLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDetails = searchParams.get(SearchParams.DETAILS);

  const setDetailsHandler = useCallback(
    async (name: string): Promise<void> => {
      setIsLoading(true);

      try {
        const data = await getApiItem(name);

        setDetails(data);
      } finally {
        if (results.length) setIsLoading(false);
      }
    },
    [results.length, setDetails, setIsLoading],
  );

  const setSearchDetailsHandler = useCallback(
    (name: string): void => {
      setSearchParams((prevParams) => {
        prevParams.set(SearchParams.DETAILS, name);
        return prevParams;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (currentDetails) setDetailsHandler(currentDetails);
  }, [currentDetails, setDetailsHandler]);

  return (
    <div className={styles.results}>
      {results.length ? (
        results.map(({ name }) => (
          <Result key={name} name={name} setSearchDetailsHandler={setSearchDetailsHandler} />
        ))
      ) : (
        <h3 data-testid="no-results">No results</h3>
      )}
    </div>
  );
});
