import {
 PROFILE_LOADED,
 LOGOUT,
 EMAIL_LOADED,
 EMAIL_CLEARED,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
 RESET_PASSWORD,
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

  case RESET_PASSWORD:
   return {
    ...state,
    otp: action.payload,
   };

  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
   localStorage.setItem("token", action.payload.token);
   return {
    ...state,
    ...action.payload,
    loading: false,
   };

  case EMAIL_LOADED:
   return {
    ...state,
    email: action.payload,
   };

  case EMAIL_CLEARED:
   return {
    ...state,
    email: null,
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
