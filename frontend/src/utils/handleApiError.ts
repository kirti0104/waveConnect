import axios from 'axios';

export const handleApiError = (error: unknown, defaultMessage = 'Something went wrong') => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.message ||
      defaultMessage;

    console.error(' API Error:', message);
    return message;
  } else {
    console.error(' Unknown Error:', error);
    return defaultMessage;
  }
};
