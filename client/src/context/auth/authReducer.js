import {
 PROFILE_LOADED,
 LOGOUT,
 OTP_LOADED,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case USER_LOADED:
   return {
    ...state,
    isAuthenticated: true,
    user: action.payload,
   };
  case PROFILE_LOADED:
   return {
    ...state,
    isAuthenticated: true,
    profile: action.payload,
   };

  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
   localStorage.setItem("token", action.payload.token);
   return {
    ...state,
    ...action.payload,
    isAuthenticated: true,
    loading: false,
   };

  case OTP_LOADED:
   return {
    ...state,
    otp: action.payload,
   };
  case REGISTER_FAIL:
  case LOGIN_FAIL:
  case LOGOUT:
   localStorage.removeItem("token");
   return {
    ...state,
    token: null,
    isAuthenticated: false,
    profile: null,
    error: action.payload,
   };
  default:
   return state;
 }
};
