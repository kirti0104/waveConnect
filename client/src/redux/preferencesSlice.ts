import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Preferences {
  language: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  wakeTime: string;
  bedTime: string;
  weight:string;
  height:string;
  bloodGlucose:string;
  cholesterol:string;
  bloodPressure:string;
  distance:string;
  communicationType:string[];
}


const initialState: Preferences = {
  language: "English",
  breakfast: "",
  lunch: "",
  dinner: "",
  wakeTime: "",
  bedTime: "",
  weight:"",
  height:"",
  bloodGlucose:"",
  cholesterol:"",
  bloodPressure:"",
  distance:"",
  communicationType:[],
};

const preferencesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Preferences>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
    clearUser: () => initialState,
  },
});

export const { setPreferences, clearUser } = preferencesSlice.actions;

export default preferencesSlice.reducer;



