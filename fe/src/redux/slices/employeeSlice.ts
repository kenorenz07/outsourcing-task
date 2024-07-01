import { UserType } from '@/shared/models/User.model';
import { createSlice } from '@reduxjs/toolkit';

export interface EmployeeState {
  employees: Array<UserType> | null;
}

const initialState: EmployeeState = {
  employees: null,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, { payload }) => {
      state.employees?.push(payload);
    },
    updateEmployee: (state, { payload }) => {
      if (!state.employees || state.employees.length === 0) {
        return;
      }

      let copyOfEmployees = state.employees;
      const employeesIndex = copyOfEmployees?.findIndex(
        ({ id }) => id === payload.id
      );

      if (employeesIndex !== -1) {
        copyOfEmployees[employeesIndex] = { ...payload };
        state.employees = copyOfEmployees;
      }
    },
    deleteEmployee: (state, { payload }) => {
      if (!state.employees || state.employees.length === 0) {
        return;
      }

      state.employees = state.employees.filter(({ id }) => id !== payload);
    },
  },
});

export const employeesAction = employeeSlice.actions;

export default employeeSlice.reducer;
