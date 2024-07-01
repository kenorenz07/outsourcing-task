import httpClient from '@/plugins/axios';
import { APP_API } from '@/shared/config/app.config';
import { successNotify } from '@/shared/utils/toast.util';
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
import * as yup from 'yup';

export type RegistrationFormType = {
  username: string;
  password: string;
  confirm_password: string;
  name: string;
};

const Register: PagePropsType = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().trim().required('name is required'),
    username: yup
      .string()
      .trim()
      .required('Username is required')
      .matches(/^\S*$/, 'Username cannot contain spaces'),
    password: yup.string().trim().required('Password is Required'),
    confirm_password: yup
      .string()
      .trim()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegistrationFormType>({
    defaultValues: {
      password: '',
      confirm_password: '',
      username: '',
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async ({
    password,
    username,
    name,
  }: RegistrationFormType) => {
    try {
      const response = await httpClient.post(APP_API + '/register', {
        name,
        username,
        password,
      });
      successNotify('Registered Successfully');

      router.push('/login');
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
          Register
        </Typography>
        <TextField
          {...register('name')}
          label="Name"
          sx={{ mb: 2, width: '300px' }}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />
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
        <TextField
          {...register('confirm_password')}
          label="Confirm password"
          sx={{ mb: 2, width: '300px' }}
          error={!!errors.confirm_password?.message}
          helperText={errors.confirm_password?.message}
        />

        <div className="flex space-x-2 items-center">
          <Button type="submit" color="primary" sx={{ mb: 2 }}>
            Register
          </Button>
        </div>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </form>
  );
};

Register.auth = {
  required: false,
};

export default Register;
