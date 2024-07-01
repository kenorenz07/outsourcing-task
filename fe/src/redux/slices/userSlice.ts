import { AuthenticatedUserType } from '@/shared/models/User.model';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  authenticatedUser: AuthenticatedUserType | null;
}

const initialState: UserState = {
  authenticatedUser: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
