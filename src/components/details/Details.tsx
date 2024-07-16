import { Params } from 'api/api.consts';
import { getApiItem } from 'api/api.helpers';
import { ApiResult } from 'api/api.interfaces';
import { Loader } from 'components/loader/Loader';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './details.module.scss';

export const Details: FC = memo(() => {
  const { name } = useParams<Params>();

  const [details, setDetails] = useState<ApiResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setDetailsHandler = useCallback(async (): Promise<void> => {
    if (!name) return;

    setIsLoading(true);

    try {
      const data = await getApiItem(name);

      setDetails(data);
    } finally {
      setIsLoading(false);
    }
  }, [name]);

  useEffect(() => {
    setDetailsHandler();
  }, [setDetailsHandler]);

  return (
    details && (
      <div className={styles.details}>
        <h2>Details:</h2>
        <span>Name: {details.name}</span>
        <span>Mass: {details.mass}</span>
        <span>Height: {details.height}</span>
        <span>Eye color: {details.eye_color}</span>
        <span>Hair color: {details.hair_color}</span>
        <span>Skin color: {details.skin_color}</span>
        <button onClick={() => setDetails(null)}>Close</button>
        {isLoading && <Loader />}
      </div>
    )
  );
});
