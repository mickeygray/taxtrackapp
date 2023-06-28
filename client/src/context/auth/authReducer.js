import {
 PROFILE_LOADED,
 LOGOUT,
 EMAIL_LOADED,
 EMAIL_CLEARED,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 AUTHENTICATE_USER,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
 CLEAR_ERRORS,
 RESET_PASSWORD,
 TOGGLE_REMEMBER_ME,
 LOAD_CRED,
 CLEAR_CRED,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case AUTHENTICATE_USER:
   return {
    ...state,
    userAuthenticated: true,
    loading: false,
    ...action.payload,
   };
  case PROFILE_LOADED:
   return {
    ...state,
    isAuthenticated: true,
    profileAuthenticated: true,
    loading: false,
    profile: action.payload,
   };
  case RESET_PASSWORD:
   localStorage.removeItem("token");
   return {
    ...state,
    otp: action.payload,
   };
  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
   localStorage.setItem("token", action.payload.token);
   return {
    ...state,
    profileAuthenticated: true,
    loading: false,
    ...action.payload,
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
  case LOAD_CRED:
   return {
    ...state,
    clientId: action.payload,
   };
  case CLEAR_CRED:
   return {
    ...state,
    clientId: null,
   };

  case REGISTER_FAIL:
  case LOGIN_FAIL:
  case LOGOUT:
   localStorage.removeItem("token");
   return {
    ...state,
    token: null,
    profileAuthenticated: false,
    userAuthenticated: false,
    profile: null,
    user: null,
    error: action.payload,
   };
  case TOGGLE_REMEMBER_ME:
   return {
    ...state,
    rememberMe: !state.rememberMe,
   };
  case CLEAR_ERRORS:
   return {
    ...state,
    error: null,
   };
  default:
   return state;
 }
};
