import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../../config/Constant";

const initialState = {
  userInfo: null,
  userType: "guest",
  details: null,
  propertyIDD: null,
  modalToggle: false,
  loginModal: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setUserType: (state, action) => {
      state.userType = action.payload;
    },

    setModelToggle: (state, action) => {
      state.modalToggle = action.payload;
    },
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
    setPropertidd: (state, action) => {
      state.propertyIDD = action.payload;
    },

    setBookingDetailsData: (state, action) => {
      state.details = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem(KEYS.USER_INFO);
      sessionStorage.removeItem(KEYS.USER_INFO);
     
    },
  },
});

export const {
  setUserInfo,
  clearUser,
  setUserType,
  setBookingDetailsData,
  setPropertidd,
  setModelToggle,
  setLoginModal,
} = userSlice.actions;

export default userSlice.reducer;
