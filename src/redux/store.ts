import { configureStore } from '@reduxjs/toolkit';
import { api } from 'redux/api/api';
import { selectReducer } from 'redux/reducers/select.reducer';

export const store = configureStore({
  reducer: {
    select: selectReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
