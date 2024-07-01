import { APP_API } from '@/shared/config/app.config';
import { getUserToken, setUserToken } from '@/shared/utils/local-storage.util';
import { errorNotify } from '@/shared/utils/toast.util';
import axios, { AxiosError, AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: APP_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const messages: string[] = [];

    if (error.response) {
      switch (error.response.status) {
        case 404:
          break;
        case 500:
          messages.push('Internal Server Error.');
          break;
        case 503:
          messages.push(
            'Service unavailable, please check your internet connection to continue.'
          );
          break;
        case 401:
          setUserToken('');
          messages.push('You are not logged in. Please login first.');
          break;
        case 422:
          messages.push(error.response.data.message);
          break;
        default:
          messages.push(
            'Opps, something went wrong in processing your request.'
          );
          break;
      }

      messages.forEach((message) => errorNotify(message));
    }

    return Promise.reject(error);
  }
);

export default httpClient;
