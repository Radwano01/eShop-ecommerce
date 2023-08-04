import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const Slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, userName, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    REMOVE_ACTIVE_USER(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = Slice.actions;

export const selectIsLoggedIn = (state) => state.slice.isLoggedIn;
export const selectEmail = (state) => state.slice.email;
export const selectUserName = (state) => state.slice.userName;
export const selectUserID = (state) => state.slice.userID;

export default Slice.reducer;