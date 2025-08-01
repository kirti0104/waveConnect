import axios from 'axios';
import { UserSignupData } from '../types/userSIgnupData';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signupUser = async (userData:UserSignupData) => {
  const response = await axios.post(`${apiUrl}/auth/signup`, userData);
  return response.data;
};
