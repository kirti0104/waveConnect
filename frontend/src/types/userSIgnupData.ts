// src/types/UserSignupData.ts
export interface UserSignupData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    senderId?: string;
  }
  