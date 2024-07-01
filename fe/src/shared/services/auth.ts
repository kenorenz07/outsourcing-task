import axios from 'axios';
import { errorNotify } from '../utils/toast.util';

const api = axios.create({
  baseURL: 'http://your-laravel-backend-url/api',
});

export const getUser = async (): Promise<any> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    errorNotify('Error with getting user');
    return null;
  }
};

export const rememberMe = async (): Promise<any> => {
  const rememberToken = localStorage.getItem('remember_token');
  if (!rememberToken) return null;

  try {
    const response = await api.post('/remember', {
      remember_token: rememberToken,
    });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (err) {
    errorNotify('Error with remember me');
    return null;
  }
};
