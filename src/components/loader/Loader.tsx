import { PureComponent, ReactNode } from 'react';

import styles from './loader.module.scss';

export class Loader extends PureComponent {
  render(): ReactNode {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  }
}
