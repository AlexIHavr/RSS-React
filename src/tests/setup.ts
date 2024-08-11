import '@testing-library/jest-dom/vitest';
import { ApiActual } from 'reduxToolkit/api/api.interfaces';
import { vi } from 'vitest';

import { CARD_ITEM, CARD_LIST } from './mockData';

vi.mock('reduxToolkit/api/api', async () => {
  const actual = (await vi.importActual('reduxToolkit/api/api')) as ApiActual;

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

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), query: { name: '' } }),
  useSearchParams: () => ({ get: () => '1' }),
}));
