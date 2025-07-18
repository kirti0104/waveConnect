import axios from 'axios';
import { UserSignupData } from '../types/userSIgnupData';

const apiUrl = process.env.REACT_APP_API_URL;

export const signupUser = async (userData:UserSignupData) => {
  const response = await axios.post(`${apiUrl}/signup`, userData);
  return response.data;
};
