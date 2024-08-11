import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'App';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';
import { describe, expect, test, vi } from 'vitest';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for pagination component', () => {
  test('the component updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const pagination = screen.getByTestId('pagination');
    const [prevButton, nextButton] = pagination.children;

    const user = userEvent.setup();

    await user.click(nextButton);

    expect(mockRouter).toMatchObject({});

    await user.click(prevButton);

    expect(mockRouter).toMatchObject({});
  });
});
