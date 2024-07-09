import { PureComponent, ReactNode } from 'react';

import { ResultsProps } from './results.types';
import styles from './results.module.scss';

export class Results extends PureComponent<ResultsProps> {
  render(): ReactNode {
    return (
      <main className={styles.results}>
        {this.props.results.length ? (
          this.props.results.map(({ episode_id, title, opening_crawl }) => (
            <div key={episode_id}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{opening_crawl}</p>
            </div>
          ))
        ) : (
          <h3>No results</h3>
        )}
      </main>
    );
  }
}
