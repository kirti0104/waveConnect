import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTab: "basic" | "personal";
}

const initialState: TabState = {
  activeTab: "basic",
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<"basic" | "personal">) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
