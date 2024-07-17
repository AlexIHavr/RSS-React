import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, SearchParams } from 'api/api.consts';
import { ApiData } from 'api/api.interfaces';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<ApiData, { searchValue: string; page: number }>({
      query: ({ searchValue, page }) => `?search=${searchValue}&${SearchParams.PAGE}=${page}`,
    }),
    getPersonByName: builder.query<ApiData, string>({
      query: (name) => `?search=${name}`,
    }),
  }),
});
