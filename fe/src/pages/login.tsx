import httpClient from '@/plugins/axios';
import { APP_API } from '@/shared/config/app.config';
import {
  AuthenticatedUserType,
  UserDataType,
} from '@/shared/models/User.model';
import { PagePropsType } from '@/types/app-components';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { userActions } from '../redux/slices/userSlice';
import { setUserToken } from '@/shared/utils/local-storage.util';
import { successNotify } from '@/shared/utils/toast.util';

export type LoginFormType = {
  username: string;
  password: string;
  remember_me: boolean;
};

const Login: PagePropsType = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Username is required')
      .matches(/^\S*$/, 'Username cannot contain spaces'),
    password: yup.string().trim().required('Password is Required'),
    remember_me: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormType>({
    defaultValues: {
      password: '',
      remember_me: false,
      username: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async ({
    password,
    username,
    remember_me,
  }: LoginFormType) => {
    try {
      const {
        data,
      }: {
        data: {
          data: UserDataType;
        };
      } = await httpClient.post(APP_API + '/login', {
        username,
        password,
        remember_me,
      });

      dispatch(userActions.setAuthenticatedUser(data.data));
      successNotify('Login successfull');
      setUserToken(data.data.token);
      router.push('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex justify-center items-center h-screen"
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          {...register('username')}
          label="Username"
          sx={{ mb: 2, width: '300px' }}
          error={!!errors.username?.message}
          helperText={errors.username?.message}
        />
        <TextField
          {...register('password')}
          label="Password"
          sx={{ mb: 2, width: '300px' }}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Controller
              name="remember_me"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Checkbox {...field} checked={field['value'] ?? false} />
              )}
            />
          }
          label="Remember me"
        />

        <div className="flex space-x-2 items-center">
          <Button type="submit" color="primary" sx={{ mb: 2 }}>
            Login
          </Button>
          <Button
            type="button"
            color="success"
            sx={{ mb: 2 }}
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </div>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </form>
  );
};

Login.auth = {
  required: false,
};

export default Login;
