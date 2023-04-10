import React, { useReducer } from "react";
import AuthContext from "./authContext";
import axios from "axios";
import authReducer from "./authReducer";
import { PROFILE_LOADED, TOKEN_LOADED, AUTH_ERROR, LOGOUT } from "../types";

const AuthState = (props) => {
 const initialState = {
  profile: null,
  error: null,
  isAuthenticated: false,
  token: null,
 };

 const [state, dispatch] = useReducer(authReducer, initialState);

 const loadToken = async (encodedString) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/auth/verify?q=${encodedString}`, config);

  dispatch({ type: TOKEN_LOADED, payload: res.data });
 };

 const loadProfile = async (encodedString) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/auth/verified?q=${encodedString}`, config);

  dispatch({ type: PROFILE_LOADED, payload: res.data });
 };

 const logout = () => {
  dispatch({ type: LOGOUT });
 };

 return (
  <AuthContext.Provider
   value={{
    loadToken,
    loadProfile,
    logout,
    profile: state.profile,
    error: state.error,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
   }}>
   {props.children}
  </AuthContext.Provider>
 );
};

export default AuthState;
