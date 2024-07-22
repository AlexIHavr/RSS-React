import { createApi } from '@reduxjs/toolkit/query';

export interface ApiActual {
  api: typeof createApi & {
    useGetPeopleQuery: () => void;
    useGetPersonByNameQuery: () => void;
  };
}
