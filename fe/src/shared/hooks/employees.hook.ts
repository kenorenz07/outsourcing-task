import httpClient from '@/plugins/axios';
import { APP_API } from '@/shared/config/app.config';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { errorNotify } from '../utils/toast.util';
import { employeesAction } from '@/redux/slices/employeeSlice';

const useEmployees = () => {
  const dispatch = useDispatch();

  const [employeesFetched, setEmployeesFetched] = useState<boolean>(false);

  const initializeEmployees = async (): Promise<void> => {
    try {
      setEmployeesFetched(false);

      const result = await httpClient.get(APP_API + '/employees');
      dispatch(employeesAction.setEmployees(result.data.data));
    } catch (e) {
      errorNotify('Employees not found');
    } finally {
      setEmployeesFetched(true);
    }
  };

  return { initializeEmployees, employeesFetched };
};

export default useEmployees;
