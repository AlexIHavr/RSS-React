import { Params } from 'api/api.consts';
import { Loader } from 'components/loader/Loader';
import { useSearchParamsString } from 'hooks/useSearchParamsString';
import { FC, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from 'reduxToolkit/api/api';

import styles from './details.module.scss';

export const Details: FC = memo(() => {
  const { name } = useParams<Params>();
  const searchParamsString = useSearchParamsString();

  const { data, isFetching } = api.useGetPersonByNameQuery(name ?? '');

  const details = data?.results?.[0];

  return (
    <div className={styles.details} data-testid="details">
      {details ? (
        <>
          <h2>Details:</h2>
          <span>Name: {details.name}</span>
          <span>Mass: {details.mass}</span>
          <span>Height: {details.height}</span>
          <span>Eye color: {details.eye_color}</span>
          <span>Hair color: {details.hair_color}</span>
          <span>Skin color: {details.skin_color}</span>
          <Link to={searchParamsString} data-testid="close">
            <button>Close</button>
          </Link>
        </>
      ) : (
        <h3>No data</h3>
      )}
      {isFetching && <Loader />}
    </div>
  );
});
