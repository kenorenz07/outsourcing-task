import httpClient from '@/plugins/axios';
import { useState } from 'react';
import { APP_API } from '../config/app.config';
import { AuthenticatedUserType } from '../models/User.model';
import { errorNotify } from '../utils/toast.util';
import { useDispatch } from 'react-redux';
import { userActions } from '@/redux/slices/userSlice';

export type ApiMeReturnType = {
  id: number;
  name: string;
  username: string;
  permission_slugs: string[];
};

const useAuthenticatedUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthenticatedUserType | null>(null);
  const dispatch = useDispatch();

  const getAuthenticatedUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: { data: { data: ApiMeReturnType } } = await httpClient.get(
        APP_API + '/me'
      );
      dispatch(userActions.setAuthenticatedUser(result.data.data));
    } catch (e) {
      errorNotify('Error in getting authenticated user');
    } finally {
      setLoading(false);
    }
  };

  return { getAuthenticatedUser, loading, authUser };
};

export default useAuthenticatedUser;
