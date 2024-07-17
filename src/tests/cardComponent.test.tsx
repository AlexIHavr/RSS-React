import { render, screen } from '@testing-library/react';
import { Result } from 'components/result/Result';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/store';
import { describe, expect, test } from 'vitest';

import { CARD_LIST } from './mockData';

describe('Tests for card component', () => {
  const name = CARD_LIST.results[0].name;

  test('the card component renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result name={name} />,
        </BrowserRouter>
      </Provider>,
    );

    const result = screen.getByTestId('result');

    expect(result).toBeInTheDocument();
    expect(result).toHaveTextContent(name);
    expect(result).toHaveAttribute('href', `${import.meta.env.BASE_URL}${name}`);
  });
});
