import '@testing-library/jest-dom/vitest';
import { ApiActual } from 'redux/api/api.interfaces';
import { vi } from 'vitest';

import { CARD_ITEM, CARD_LIST } from './mockData';

vi.mock('redux/api/api', async () => {
  const actual = (await vi.importActual('redux/api/api')) as ApiActual;

  actual.api.useGetPeopleQuery = vi.fn(() => ({
    data: CARD_LIST,
    isFetching: true,
  }));

  actual.api.useGetPersonByNameQuery = vi.fn(() => ({
    data: CARD_ITEM,
    isFetching: true,
  }));

  return actual;
});
