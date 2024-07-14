import { ErrorInfo, PureComponent, ReactNode } from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from './errorBoundary.interfaces';
import styles from './errorBoundary.module.scss';

export class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { errorMessage: null };

  static getDerivedStateFromError({ message }: Error): ErrorBoundaryState {
    return { errorMessage: message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render(): ReactNode {
    return this.state.errorMessage ? (
      <h1 className={styles.errorMessage}>Error: {this.state.errorMessage}</h1>
    ) : (
      this.props.children
    );
  }
}
