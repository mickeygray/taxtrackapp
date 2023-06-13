import React, { useReducer } from "react";
import AuthContext from "./authContext";
import axios from "axios";
import authReducer from "./authReducer";
import { encode as base64_encode } from "base-64";
import setAuthToken from "../../utils/setAuthToken";
import {
 PROFILE_LOADED,
 EMAIL_LOADED,
 EMAIL_CLEARED,
 CLEAR_OTP,
 AUTH_ERROR,
 LOGOUT,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 RESET_PASSWORD,
 USER_LOADED,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
} from "../types";

const AuthState = (props) => {
 const initialState = {
  profile: null,
  error: null,
  isAuthenticated: false,
  profileList: [],
  user: null,
  email: null,
  otp: null,
 };

 const [state, dispatch] = useReducer(authReducer, initialState);

 const savePin = async (email, pinString) => {
  const obj = { email, pinString };

  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.put(`/api/auth/pin`, obj, config);

   dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data,
   });
   loadProfile();
  } catch (err) {
   dispatch({
    type: REGISTER_FAIL,
    payload: err.response.data.msg,
   });
  }
 };

 const clearEmail = () => {
  dispatch({ type: EMAIL_CLEARED });
 };

 const clearOtp = () => {
  dispatch({ type: CLEAR_OTP });
 };

 const verifyAccount = async (obj) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.post(`/api/auth/verify`, obj, config);

  dispatch({ type: EMAIL_LOADED, payload: res.data });
 };

 const resetPassword = async (email) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.post(`/api/auth/forget`, { email }, config);

  dispatch({ type: RESET_PASSWORD, payload: res.data });
 };

 const loadProfile = async () => {
  setAuthToken(localStorage.token);

  try {
   const res = await axios.get("/api/auth");

   dispatch({
    type: PROFILE_LOADED,
    payload: res.data,
   });

   console.log(res.data);
  } catch (err) {
   dispatch({ type: AUTH_ERROR });
  }
 };

 const pinLogin = async (pw, email) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const obj = { pw, email };

  console.log(obj);

  const res = await axios.post(`/api/auth/login`, obj, config);

  dispatch({ type: LOGIN_SUCCESS, payload: res.data });

  if (localStorage.token) {
   loadProfile();
  }
 };

 const logout = () => {
  dispatch({ type: LOGOUT });
 };

 const loadUser = async (res) => {
  console.log(res);
  try {
   dispatch({
    type: USER_LOADED,
    payload: res.profileObj,
   });
  } catch (err) {
   dispatch({ type: AUTH_ERROR });
  }
 };

 return (
  <AuthContext.Provider
   value={{
    loadProfile,
    savePin,
    pinLogin,
    loadUser,
    verifyAccount,
    resetPassword,
    logout,
    clearEmail,
    clearOtp,
    profile: state.profile,
    error: state.error,
    token: state.token,
    user: state.user,
    otp: state.otp,
    email: state.email,
    isAuthenticated: state.isAuthenticated,
   }}>
   {props.children}
  </AuthContext.Provider>
 );
};

export default AuthState;
