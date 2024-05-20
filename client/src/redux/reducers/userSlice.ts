import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number | string;
  username?: string;
  email: string;
  profilePicture?: string;
}

interface UserState {
  isAuthenticated: boolean;
  currentUser: User | null; // Replace 'User' with your actual user type
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    LoadUserFail: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { LoadUserRequest, LoadUserSuccess, LoadUserFail } =
  userSlice.actions;

export default userSlice.reducer;
