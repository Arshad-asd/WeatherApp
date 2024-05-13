import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    googleUserInfo: localStorage.getItem("googleUserInfo")
      ? JSON.parse(localStorage.getItem("googleUserInfo"))
      : null,
  };
  

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState,
  reducers: {
    setGoogleUserInfo: (state, action) => {
      state.googleUserInfo = action.payload;
      localStorage.setItem("googleUserInfo", JSON.stringify(action.payload));

    },
    clearGoogleUserInfo: (state) => {
      state.googleUserInfo = null;
      localStorage.removeItem("googleUserInfo");

    },
  },
});

export const { setGoogleUserInfo, clearGoogleUserInfo } = googleAuthSlice.actions;

export default googleAuthSlice.reducer;
