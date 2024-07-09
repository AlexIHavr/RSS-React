import { PureComponent, ReactNode, createRef } from 'react';
import { getApiResults } from 'api/api.helpers';
import { Loader } from 'components/loader/Loader';
import { Results } from 'components/results/Results';
import { LocalStorageService } from 'services/localStorage.service';

import styles from './search.module.scss';
import { SearchState } from './search.interfaces';

export class Search extends PureComponent<unknown, SearchState> {
  inputRef = createRef<HTMLInputElement>();
  state = {
    results: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount(): void {
    this.onClickHandler(LocalStorageService.getData('searchValue'));
    document.addEventListener('keyup', this.onEnterHandler);
  }

  componentDidUpdate(): void {
    if (this.state.isError) throw new Error('crash app');
  }

  componentWillUnmount(): void {
    document.removeEventListener('keyup', this.onEnterHandler);
  }

  onEnterHandler = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter') return;

    this.onClickHandler();
  };

  onClickHandler = async (savedValue?: string | null): Promise<void> => {
    const current = this.inputRef.current;

    if (!current) return;

    const value = savedValue ?? current.value.trim();

    this.setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const results = await getApiResults(value);
      this.setState((prev) => ({ ...prev, results }));

      LocalStorageService.saveData('searchValue', value);

      current.value = value;
    } finally {
      this.setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  onCrashAppHandler = (): void => {
    this.setState((prev) => ({ ...prev, isError: true }));
  };

  render(): ReactNode {
    return (
      <>
        <header className={styles.header}>
          <input ref={this.inputRef} type="text" placeholder="Type text..." />
          <button className={styles.searchButton} onClick={() => this.onClickHandler()}>
            Search
          </button>
          <button className={styles.crashButton} onClick={this.onCrashAppHandler}>
            Crash app
          </button>
        </header>
        <Results results={this.state.results} />
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}
