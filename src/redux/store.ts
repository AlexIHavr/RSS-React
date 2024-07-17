import { configureStore } from '@reduxjs/toolkit';
import { selectReducer } from 'redux/reducers/select.reducer';

export const store = configureStore({
  reducer: {
    select: selectReducer,
  },
});
