/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";

// interface RegisterPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword: string;
//   senderId?: string;
// }

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const response = await authService.register( userData);
      return response.data; 
    } catch (error:unknown) {
      return thunkApi.rejectWithValue("Registration failed");
    }
  }
);
