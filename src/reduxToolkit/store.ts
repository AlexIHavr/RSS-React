import { configureStore } from '@reduxjs/toolkit';
import { api } from 'reduxToolkit/api/api';
import { pageReducer } from 'reduxToolkit/reducers/page/page.reducer';
import { selectReducer } from 'reduxToolkit/reducers/select/select.reducer';

export const store = configureStore({
  reducer: {
    select: selectReducer,
    page: pageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
