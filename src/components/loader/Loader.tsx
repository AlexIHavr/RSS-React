import { useThemeContext } from 'hooks/useThemeContext';
import { FC } from 'react';
import { Theme } from 'utils/context';

import styles from './loader.module.scss';

export const Loader: FC = () => {
  const { theme } = useThemeContext();

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader + ' ' + (theme === Theme.DARK ? styles.darkLoader : '')}></div>
    </div>
  );
};
