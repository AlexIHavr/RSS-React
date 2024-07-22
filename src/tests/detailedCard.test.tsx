import { fireEvent, render, screen } from '@testing-library/react';
import { Details } from 'components/details/Details';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'redux/store';
import { router } from 'utils/router';
import { describe, expect, test } from 'vitest';

import { CARD_LIST } from './mockData';

const result = CARD_LIST.results[0];

describe('Tests for details card', () => {
  test('loading indicator is displayed while fetching data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>,
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>,
    );

    const details = screen.getByTestId('details');

    expect(details).toHaveTextContent(result.name);
    expect(details).toHaveTextContent(result.mass);
    expect(details).toHaveTextContent(result.eye_color);
    expect(details).toHaveTextContent(result.hair_color);
    expect(details).toHaveTextContent(result.skin_color);
  });

  test('clicking the close button hides the component', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const cardLink = screen.getByText(result.name);

    fireEvent.click(cardLink);

    const closeLink = screen.getByTestId('close');

    fireEvent.click(closeLink);

    expect(screen.queryByTestId('details')).toBeNull();
  });
});
