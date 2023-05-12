import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  labels: [],
};

const selectedLabelsSlice = createSlice({
  name: 'selectedLabels',
  initialState,
  reducers: {
    addSelectedLabel: (state, { payload }) => {
      state.labels.push(payload);
    },
    removeSelectedLabel: (state, { payload }) => {
      state.labels = state.labels.filter(e => e !== payload);
    }
  },
});

export const { addSelectedLabel, removeSelectedLabel } = selectedLabelsSlice.actions;
export default selectedLabelsSlice.reducer;