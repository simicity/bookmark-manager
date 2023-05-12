import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  flag: false,
};

const formSubmittedSlice = createSlice({
  name: 'formSubmitted',
  initialState,
  reducers: {
    submitForm: state => {
      state.flag = true;
    },
    resetForm: state => {
      state.flag = false;
    },
  },
});

export const { submitForm, resetForm } = formSubmittedSlice.actions;
export default formSubmittedSlice.reducer;