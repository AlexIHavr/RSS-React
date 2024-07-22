import { configureStore } from '@reduxjs/toolkit';
import { api } from 'redux/api/api';
import { pageReducer } from 'redux/reducers/page/page.reducer';
import { selectReducer } from 'redux/reducers/select/select.reducer';

export const store = configureStore({
  reducer: {
    select: selectReducer,
    page: pageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
