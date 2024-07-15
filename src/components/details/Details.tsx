import { FC, memo } from 'react';

import { DetailsProps } from './details.interfaces';
import styles from './details.module.scss';

export const Details: FC<DetailsProps> = memo(({ details, closeDetailsHandler }) => {
  return (
    <div className={styles.details}>
      <h2>Details:</h2>
      <span>Name: {details.name}</span>
      <span>Mass: {details.mass}</span>
      <span>Height: {details.height}</span>
      <span>Eye color: {details.eye_color}</span>
      <span>Hair color: {details.hair_color}</span>
      <span>Skin color: {details.skin_color}</span>
      <button onClick={closeDetailsHandler}>Close</button>
    </div>
  );
});
