import httpClient from '@/plugins/axios';
import { APP_API } from '@/shared/config/app.config';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { errorNotify } from '../utils/toast.util';
import { tasksAction } from '@/redux/slices/taskSlice';

const useTasks = () => {
  const dispatch = useDispatch();

  const [tasksFetched, setTasksFetched] = useState<boolean>(false);

  const initializeTasks = async (): Promise<void> => {
    try {
      setTasksFetched(false);

      const result = await httpClient.get(APP_API + '/tasks');
      dispatch(tasksAction.setTasks(result.data.data));
    } catch (e) {
      errorNotify('Tasks not found');
    } finally {
      setTasksFetched(true);
    }
  };

  return { initializeTasks, tasksFetched };
};

export default useTasks;
