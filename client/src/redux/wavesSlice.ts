import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  photoUrl: File | null;
  message: string;
}

const initialState: FormState = {
  photoUrl: null,
  message: '',
};

const waveSlice = createSlice({
  name:"createWaves",
     initialState,
     reducers:{
         setFormValues:(state, action:PayloadAction<FormState>)=>{
             return{state, ...action.payload};
         },
         clearForm:()=>initialState,
     }
});

export const { setFormValues,clearForm } = waveSlice.actions;
export default waveSlice.reducer;
