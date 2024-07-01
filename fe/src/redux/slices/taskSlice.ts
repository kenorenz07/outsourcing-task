import { TaskType } from '@/shared/models/Task.model';
import { createSlice } from '@reduxjs/toolkit';

export interface TaskState {
  tasks: Array<TaskType> | null;
}

const initialState: TaskState = {
  tasks: null,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, { payload }) => {
      state.tasks?.push(payload);
    },
    updateTask: (state, { payload }) => {
      if (!state.tasks || state.tasks.length === 0) {
        return;
      }

      let copyOfTasks = state.tasks;
      const tasksIndex = copyOfTasks?.findIndex(({ id }) => id === payload.id);

      if (tasksIndex !== -1) {
        copyOfTasks[tasksIndex] = { ...payload };
        state.tasks = copyOfTasks;
      }
    },
    deleteTask: (state, { payload }) => {
      if (!state.tasks || state.tasks.length === 0) {
        return;
      }

      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    },
  },
});

export const tasksAction = taskSlice.actions;

export default taskSlice.reducer;
