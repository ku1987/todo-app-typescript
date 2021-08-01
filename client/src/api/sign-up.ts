import { BASE_API_URL } from 'biz/const';
import { postData } from './apiClient';

const BASE_PATH = `${BASE_API_URL}/users`;

export const signUp = async (email: string, password: string) => {
  const data = {
    userId: email,
    password,
  };
  const result = await postData(BASE_PATH, data);
  if (result.status !== 'success') {
    throw new Error('Failed to sign up.');
  }
  return result.data;
};
