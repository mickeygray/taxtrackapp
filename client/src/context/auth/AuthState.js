import React, { useReducer } from "react";
import AuthContext from "./authContext";
import axios from "axios";
import authReducer from "./authReducer";
import { encode as base64_encode } from "base-64";
import setAuthToken from "../../utils/setAuthToken";
import {
 PROFILE_LOADED,
 OTP_LOADED,
 AUTH_ERROR,
 LOGOUT,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
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
  token: null,
  user: null,
  otp: null,
 };

 const [state, dispatch] = useReducer(authReducer, initialState);

 const rememberDevice = async (pin, encryptedString) => {
  const pinString = base64_encode(parseInt(pin + Date.now()) * Math.random());

  localStorage.setItem("ttuid", pinString);

  const encryptedPin = base64_encode(pin).split().reverse().toString();

  const obj = { encryptedString, pinString, encryptedPin };

  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.put(`/api/auth/device`, obj, config);

   dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: REGISTER_FAIL,
    payload: err.response.data.msg,
   });
  }
 };

 const loadToken = async (encodedString) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/auth/verify?q=${encodedString}`, config);

  dispatch({ type: OTP_LOADED, payload: res.data });
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

 const verifyToken = async (encodedString) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/auth/verified?q=${encodedString}`, config);

  dispatch({ type: LOGIN_SUCCESS, payload: res.data });

  loadProfile();
 };

 const pinLogin = async (encryptedPin, email) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const obj = { encryptedPin, email };

  const res = await axios.post(`/api/auth/pin`, obj, config);

  dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  loadProfile();
 };

 const logout = () => {
  dispatch({ type: LOGOUT });
 };

 const forgetDevice = async (ttuid) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  await axios.put(`/api/auth/forget`, ttuid, config);
  localStorage.removeItem("ttuid");

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
    loadToken,
    loadProfile,
    rememberDevice,
    pinLogin,
    loadUser,
    forgetDevice,
    verifyToken,
    logout,
    profile: state.profile,
    error: state.error,
    token: state.token,
    user: state.user,
    otp: state.otp,
    isAuthenticated: state.isAuthenticated,
   }}>
   {props.children}
  </AuthContext.Provider>
 );
};

export default AuthState;
