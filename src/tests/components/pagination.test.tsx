import { fireEvent, render, screen } from '@testing-library/react';
import { SearchParams } from 'api/api.consts';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'reduxToolkit/store';
import { router } from 'utils/router';
import { describe, expect, test } from 'vitest';

describe('Tests for pagination component', () => {
  test('the component updates URL query parameter when page changes', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const pagination = screen.getByTestId('pagination');
    const [prevButton, nextButton] = pagination.children;

    fireEvent.click(nextButton);

    expect(global.window.location.href).toContain(`${SearchParams.PAGE}=2`);

    fireEvent.click(prevButton);

    expect(global.window.location.href).toContain(`${SearchParams.PAGE}=1`);
  });
});
