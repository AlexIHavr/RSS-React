import { render, screen } from '@testing-library/react';
import { Results } from 'components/results/Results';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';
import { describe, expect, test } from 'vitest';

import { CARD_LIST } from '../mockData';

describe('Tests for card list', () => {
  test('renders the specified number of cards', () => {
    render(
      <Provider store={store}>
        <Results results={CARD_LIST.results} />
      </Provider>,
    );

    const listItems = screen.getAllByTestId('result');

    expect(listItems.length).toEqual(CARD_LIST.results.length);

    listItems.forEach((listItem, index) => {
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent(CARD_LIST.results[index].name);
    });
  });

  test('message is displayed if no cards are present', () => {
    render(<Results results={[]} />);

    const noResults = screen.getByTestId('no-results');

    expect(noResults).toBeInTheDocument();
  });
});
