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
 TOGGLE_IS_ADMIN,
 SEND_OTP_SUCCESS,
 SEND_ADMIN_OTP_SUCCESS,
 VERIFY_ADMIN_OTP_SUCCESS,
 VERIFY_OTP_SUCCESS,
 SET_USER_VERIFIED,
 SET_ADMIN_USER_VERIFIED,
 ADMIN_LOGIN_SUCCESS,
 TOGGLE_NOT_ADMIN, // New action type for toggling isAdmin
} from "../types";

const AuthState = (props) => {
 const initialState = {
  profile: null,
  token: localStorage.getItem("token"),
  error: null,
  isAuthenticated: false,
  clientId: "",
  profileAuthenticated: false,
  userAuthenticated: false,
  loading: true,
  profileList: [],
  user: null,
  email: null,
  otp: null,
  error: null,
  rememberMe: false,
  isAdmin: false,
  otpSent: false,
  userVerified: false, // New state variable for "isAdmin" functionality
 };

 const [state, dispatch] = useReducer(authReducer, initialState);

 useEffect(() => {
  setAuthToken(state.token);
 }, [state.token]);
 const toggleIsAdmin = () => {
  dispatch({ type: TOGGLE_IS_ADMIN });
 };

 const toggleNotAdmin = () => {
  dispatch({ type: TOGGLE_NOT_ADMIN });
 };

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

 const sendOtp = async (email) => {
  try {
   const config = {
    headers: {
     "Content-Type": "application/json",
    },
   };

   const res = await axios.post("/api/auth/send-otp", { email }, config);

   dispatch({ type: SEND_OTP_SUCCESS, payload: res.data });
   // Assuming the API returns success message
  } catch (err) {
   console.error(err.message);
   // Handle error (e.g., dispatch an error action)
  }
 };

 const sendAdminOtp = async (email) => {
  try {
   const config = {
    headers: {
     "Content-Type": "application/json",
    },
   };

   const res = await axios.post("/api/auth/admin/send-otp", { email }, config);

   dispatch({ type: SEND_ADMIN_OTP_SUCCESS, payload: res.data });
   // Assuming the API returns success message
  } catch (err) {
   console.error(err.message);
   // Handle error (e.g., dispatch an error action)
  }
 };

 // Function to verify OTP entered by the user
 const verifyOtp = async (email, otp) => {
  try {
   const res = await axios.post("/api/auth/verify-otp", { email, otp });
   dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.data });
   // Assuming the API returns success message and updates user's verification status
  } catch (err) {
   console.error(err.message);
   // Handle error
  }
 };

 const verifyAdminOtp = async (email, otp) => {
  try {
   const res = await axios.post("/api/auth/admin/verify-otp", { email, otp });
   dispatch({ type: VERIFY_ADMIN_OTP_SUCCESS, payload: res.data });
   // Assuming the API returns success message and updates user's verification status
  } catch (err) {
   console.error(err.message);
   // Handle error
  }
 };

 // Function to update the user's password and set as verified
 const updatePasswordAndVerify = async (email, password) => {
  try {
   const res = await axios.post("/api/auth/update-password", {
    email,
    password,
   });
   dispatch({ type: SET_USER_VERIFIED, payload: res.data });
   // Assuming the API returns user object with verification status
  } catch (err) {
   console.error(err.message);
   // Handle error
  }
 };

 const updatePasswordAndVerifyAdmin = async (email, password) => {
  try {
   const res = await axios.post("/api/auth/admin/update-password", {
    email,
    password,
   });
   dispatch({ type: SET_ADMIN_USER_VERIFIED, payload: res.data });
   // Assuming the API returns user object with verification status
  } catch (err) {
   console.error(err.message);
   // Handle error
  }
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

 // In AuthState or the equivalent context provider
 const saveAdminPin = async (email, pinString) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const body = JSON.stringify({ email, pinString });

  try {
   const res = await axios.put("/api/auth/admin/pin", body, config);
   // Dispatch success action with the token
   dispatch({
    type: ADMIN_LOGIN_SUCCESS,
    payload: res.data.token, // Assuming the token is returned directly
   });
  } catch (err) {
   console.error(err.response.data);
   // Handle error (e.g., showing an error message, dispatching an error action)
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
   // Clear any existing token before the login attempt
   localStorage.removeItem("token");
   setAuthToken(null); // Clear the token from axios defaults

   const res = await axios.post(`/api/auth/login`, pin, config);

   console.log(res.data);
   // Now set the new token
   localStorage.setItem("token", res.data.token);
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

 const adminLogin = async (pin) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const res = await axios.post(`/api/auth/admin/login`, pin, config);

   setAuthToken(res.data.token);
   await loadUser();
   dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.token });
  } catch (err) {
   dispatch({
    type: LOGIN_FAIL,
    payload: err.response.data.msg,
   });
  }
 };

 const logout = () => {
  setAuthToken(null);
  dispatch({ type: LOGOUT });
 };

 const loadUser = async (res) => {
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
    adminLogin,
    authenticateUser,
    logout,
    clearEmail,
    clearOtp,
    sendOtp,
    verifyOtp,
    updatePasswordAndVerify,
    toggleRememberMe,
    getGoogleClientId,
    clearGoogleClientId,
    toggleIsAdmin,
    saveAdminPin,
    updatePasswordAndVerifyAdmin,
    verifyAdminOtp,
    toggleNotAdmin,
    sendAdminOtp,
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
    isAdmin: state.isAdmin,
    otpSent: state.otpSent,
    userVerified: state.userVerified,
   }}>
   {props.children}
  </AuthContext.Provider>
 );
};

export default AuthState;
