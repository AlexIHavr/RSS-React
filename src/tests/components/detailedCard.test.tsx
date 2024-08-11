import { render, screen } from '@testing-library/react';
import { Details } from 'components/details/Details';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';
import { describe, expect, test } from 'vitest';

import { CARD_LIST } from '../mockData';

const result = CARD_LIST.results[0];

describe('Tests for details card', () => {
  test('loading indicator is displayed while fetching data', () => {
    render(
      <Provider store={store}>
        <Details />
      </Provider>,
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', () => {
    render(
      <Provider store={store}>
        <Details />
      </Provider>,
    );

    const details = screen.getByTestId('details');

    expect(details).toHaveTextContent(result.name);
    expect(details).toHaveTextContent(result.mass);
    expect(details).toHaveTextContent(result.eye_color);
    expect(details).toHaveTextContent(result.hair_color);
    expect(details).toHaveTextContent(result.skin_color);
  });
});
