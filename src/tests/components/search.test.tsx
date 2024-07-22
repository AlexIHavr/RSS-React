import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'redux/store';
import { LocalStorageService } from 'services/localStorage.service';
import { CARD_LIST } from 'tests/mockData';
import { router } from 'utils/router';
import { describe, expect, test } from 'vitest';

describe('Tests for search component', () => {
  const saveValue = 'Hello';

  test('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const search = screen.getByTestId('search');

    searchInput.value = saveValue;

    fireEvent.click(search);

    expect(LocalStorageService.getData('searchValue')).toBe(saveValue);
  });

  test('the component retrieves the value from the local storage upon mounting', () => {
    LocalStorageService.saveData('searchValue', saveValue);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const cardLink = screen.getByText(CARD_LIST.results[0].name);

    fireEvent.click(cardLink);

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    expect(searchInput.value).toBe(saveValue);
  });
});
