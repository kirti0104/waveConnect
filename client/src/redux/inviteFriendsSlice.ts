import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FormState {
  receiverFullName: string;
  receiverEmail: string;
  message: string;
}

const initialState: FormState = {
  receiverFullName: "",
  receiverEmail: "",
  message: "",
};

const inviteFriendsSlice=createSlice({
    name:"InviteFriend",
    initialState,
    reducers:{
        setFormValues:(state, action:PayloadAction<FormState>)=>{
            return{state, ...action.payload};
        },
        clearForm:()=>initialState,
    }
});

export const { setFormValues, clearForm } = inviteFriendsSlice.actions;
export default inviteFriendsSlice.reducer;