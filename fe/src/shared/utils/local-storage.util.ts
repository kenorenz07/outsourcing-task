const client = typeof window !== 'undefined';

export const getUserToken = (): string => {
  if (client) {
    const token = localStorage.getItem('token');
    return token ? window.atob(token) : '';
  }
  return '';
};

export const setUserToken = (value: string): void => {
  if (client) {
    localStorage.setItem('token', window.btoa(value));
  }
};
