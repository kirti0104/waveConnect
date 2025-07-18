import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AdminUserState {
  fullName?: string;
  email: string;
  password?: string; 
  isLoggedIn: boolean;
  token?: string;
}


const initialState: AdminUserState = {
  fullName: "",
  email: "",
  password:"",
  token:"",
  isLoggedIn: false,
 
};


const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setAdminUser: (
      state,
      action: PayloadAction<AdminUserState>
    ) => {
        return { ...state, ...action.payload, isLoggedIn: true };
    },

    clearAdminUser: () => initialState,
  },
});


export const { setAdminUser, clearAdminUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
