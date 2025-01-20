import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password?:string;
  isLoggedIn: boolean;
   token?: string;
   addressOne?:string;
   addressTwo?:string;
   city?:string;
   state?:string;
   zipCode?:string;
   socialSecurityNumber?:string;
   dob?:string;
   gender?:string;
   martialStatus?:string;
   social?:string;
   kids?:string | null;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  isLoggedIn: false,
  token: '',
  addressOne: '',
  addressTwo: '',
  city: '',
  state: '',
  zipCode: '',
  socialSecurityNumber: '',
  dob: '',
  gender: '',
  martialStatus: '',
  social: '',
  kids: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;



