import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import taskSlice from './slices/taskSlice';
import employeeSlice from './slices/employeeSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
    employee: employeeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
