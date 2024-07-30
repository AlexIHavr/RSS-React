import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PageState } from './page.interfaces';

const initialState: PageState = {
  currentPage: null,
};

export const pageSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { set } = pageSlice.actions;

export const pageReducer = pageSlice.reducer;
