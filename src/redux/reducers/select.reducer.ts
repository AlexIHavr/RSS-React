import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiResult } from 'api/api.interfaces';

import { SelectState } from './select.interfaces';

const initialState: SelectState = {
  selectedResults: [],
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ApiResult>) => {
      state.selectedResults.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.selectedResults = state.selectedResults.filter(({ name }) => name !== action.payload);
    },
  },
});

export const { add, remove } = selectSlice.actions;

export const selectReducer = selectSlice.reducer;
