import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import axios from "axios";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
 PROFILE_LOADED,
 EMAIL_LOADED,
 EMAIL_CLEARED,
 CLEAR_OTP,
 AUTH_ERROR,
 LOGOUT,
 REGISTER_FAIL,
 CLEAR_ERRORS,
 REGISTER_SUCCESS,
 RESET_PASSWORD,
 USER_LOADED,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
 TOGGLE_REMEMBER_ME,
 AUTHENTICATE_USER,
 LOAD_CRED,
 CLEAR_CRED,
} from "../types";

const AuthState = (props) => {
 const initialState = {
  profile: null,
  token: localStorage.getItem("token"),
  error: null,
  isAuthenticated: false,
  profileAuthenticated: false,
  userAuthenticated: false,
  loading: true,
  profileList: [],
  user: null,
  email: null,
  otp: null,
  error: null,
  rememberMe: false, // New state variable for "remeber me" functionality
 };

 const [state, dispatch] = useReducer(authReducer, initialState);

 setAuthToken(state.token);

 useEffect(() => {
  setAuthToken(state.token);
 }, [state.token]);

 const authenticateUser = async (access_token) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.post(
   "/api/auth/authenticate",
   { access_token: access_token },
   config
  );
  setAuthToken(res.data.token);
  dispatch({
   type: AUTHENTICATE_USER,
   payload: res.data,
  });
 };

 const savePin = async (email, pinString) => {
  const obj = { email, pinString };

  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.put(`/api/auth/pin`, obj, config);
   console.log(res);
   dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data,
   });
   setAuthToken(res.data.token);
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
  try {
   const res = await axios.get("/api/auth");

   dispatch({
    type: PROFILE_LOADED,
    payload: res.data,
   });
  } catch (err) {
   console.log(err);
   dispatch({ type: AUTH_ERROR });
  }
 };

 const getGoogleClientId = async () => {
  try {
   const res = await axios.get("/api/auth/env");

   dispatch({
    type: LOAD_CRED,
    payload: res.data,
   });
  } catch (err) {
   console.log(err);
   dispatch({ type: AUTH_ERROR });
  }
 };

 const clearGoogleClientId = () => {
  dispatch({
   type: CLEAR_CRED,
  });
 };

 const pinLogin = async (pin) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const res = await axios.post(`/api/auth/login`, pin, config);

   setAuthToken(res.data.token);
   await loadProfile();
   dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
   dispatch({
    type: LOGIN_FAIL,
    payload: err.response.data.msg,
   });
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

 const clearErrors = () => {
  dispatch({
   type: CLEAR_ERRORS,
  });
 };

 const toggleRememberMe = () => {
  dispatch({ type: TOGGLE_REMEMBER_ME });
 };

 return (
  <AuthContext.Provider
   value={{
    loadProfile,
    savePin,
    pinLogin,
    clearErrors,
    loadUser,
    verifyAccount,
    resetPassword,
    authenticateUser,
    logout,
    clearEmail,
    clearOtp,
    toggleRememberMe,
    getGoogleClientId,
    clearGoogleClientId,
    clientId: state.clientId,
    profile: state.profile,
    error: state.error,
    token: state.token,
    user: state.user,
    loading: state.loading,
    error: state.error,
    otp: state.otp,
    email: state.email,
    isAuthenticated: state.isAuthenticated,
    profileAuthenticated: state.profileAuthenticated,
    userAuthenticated: state.userAuthenticated,
    rememberMe: state.rememberMe,
   }}>
   {props.children}
  </AuthContext.Provider>
 );
};

export default AuthState;
