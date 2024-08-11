import { render, screen } from '@testing-library/react';
import { Result } from 'components/result/Result';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';
import { describe, expect, test, vi } from 'vitest';

import { CARD_LIST } from '../mockData';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for card component', () => {
  const name = CARD_LIST.results[0].name;

  test('the card component renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <Result name={name} />
      </Provider>,
    );

    const result = screen.getByTestId('result');

    expect(result).toHaveTextContent(name);
    expect(result).toHaveAttribute('href', `people/${name}?page=1`);
  });
});
