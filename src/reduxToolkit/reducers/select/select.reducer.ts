import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SelectState } from './select.interfaces';

const initialState: SelectState = {
  selectedNames: [],
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.selectedNames.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.selectedNames = state.selectedNames.filter((name) => name !== action.payload);
    },
    removeAll: (state) => {
      state.selectedNames = [];
    },
  },
});

export const { add, remove, removeAll } = selectSlice.actions;

export const selectReducer = selectSlice.reducer;
