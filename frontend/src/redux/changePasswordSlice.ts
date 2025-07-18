// redux/changePasswordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChangePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: ChangePasswordState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.oldPassword = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    clearPasswordFields: () => initialState,
  },
});

export const { setOldPassword, setNewPassword, setConfirmPassword, clearPasswordFields } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
