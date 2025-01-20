import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Wave {
  id: number;
  photoUrl: string;
  message: string;
  name: string;
  createdAt: string;
}

interface WavesState {
  waves: Wave[];
}

const initialState: WavesState = {
  waves: [],
};

const wavesSlice = createSlice({
  name: 'waves',
  initialState,
  reducers: {
    setWaves(state, action: PayloadAction<Wave[]>) {
      state.waves = action.payload;
    },
  },
});

export const { setWaves } = wavesSlice.actions;
export default wavesSlice.reducer;
