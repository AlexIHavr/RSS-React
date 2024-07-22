import { fireEvent, render, screen } from '@testing-library/react';
import { Result } from 'components/result/Result';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { api } from 'redux/api/api';
import { ApiActual } from 'redux/api/api.interfaces';
import { store } from 'redux/store';
import { router } from 'utils/router';
import { describe, expect, test, vi } from 'vitest';

import { CARD_ITEM, CARD_LIST } from './mockData';

vi.mock('redux/api/api', async (importOriginal) => {
  const actual = (await importOriginal()) as ApiActual;

  actual.api.useGetPeopleQuery = vi.fn(() => ({
    data: CARD_LIST,
    isFetching: false,
  }));

  actual.api.useGetPersonByNameQuery = vi.fn(() => ({
    data: CARD_ITEM,
    isFetching: false,
  }));

  return actual;
});

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

    expect(result).toHaveTextContent(name);
    expect(result).toHaveAttribute('href', `${import.meta.env.BASE_URL}${name}`);
  });

  test('clicking on a card opens a detailed card component and check additional API', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const cardLink = screen.getByText(name);

    fireEvent.click(cardLink);

    const details = screen.getByTestId('details');

    expect(details).toBeInTheDocument();
    expect(api.useGetPersonByNameQuery).toBeCalled();
  });
});
