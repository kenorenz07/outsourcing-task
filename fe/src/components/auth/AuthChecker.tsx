import { errorNotify } from '@/shared/utils/toast.util';
import { ParentComponentAuthType } from '@/types/app-components';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAuthenticatedUser from '../../shared/hooks/authenticated-user.hook';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
export interface IAuthChecker {
  children: React.ReactNode;
  parent: ParentComponentAuthType;
}

const AuthChecker: React.FC<IAuthChecker> = ({ children, parent }) => {
  const authenticatedUser = useSelector(
    (state: RootState) => state.user.authenticatedUser
  );
  const { getAuthenticatedUser, loading } = useAuthenticatedUser();
  const router = useRouter();
  const { roles, required } = parent.auth;

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (required) {
    if (!loading && authenticatedUser === null) {
      if (typeof window !== 'undefined') {
        router.push('/login');
      }
    } else if (authenticatedUser) {
      let allowedRole: boolean = false;

      // If auth.roles is not set, it means that all roles are allowed
      if (authenticatedUser.permission_slugs) {
        allowedRole =
          roles?.some((role: string) =>
            authenticatedUser.permission_slugs?.includes(role)
          ) ?? false;
        if (allowedRole === false) {
          errorNotify('Not Allowed to view');
          router.push('/');
        }
      }

      return children;
    }
  } else {
    if (authenticatedUser) {
      router.push('/');
    }

    return children;
  }
};

export default AuthChecker;
