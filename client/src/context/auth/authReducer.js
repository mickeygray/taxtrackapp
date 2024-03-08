import {
 PROFILE_LOADED,
 LOGOUT,
 EMAIL_LOADED,
 EMAIL_CLEARED,
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 ADMIN_LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGIN_SUCCESS,
 CLEAR_ERRORS,
 RESET_PASSWORD,
 TOGGLE_REMEMBER_ME,
 LOAD_CRED,
 CLEAR_CRED,
 SEND_OTP_SUCCESS,
 VERIFY_OTP_SUCCESS,
 TOGGLE_IS_ADMIN,
 SET_USER_VERIFIED,
 VERIFY_ADMIN_OTP_SUCCESS,
 SEND_ADMIN_OTP_SUCCESS,
 SET_ADMIN_USER_VERIFIED,
 TOGGLE_NOT_ADMIN,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case ADMIN_LOGIN_SUCCESS:
   localStorage.setItem("token", action.payload); // Optionally store the token in localStorage
   return {
    ...state,
    token: action.payload,
    userAuthenticated: true,
    loading: false,
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
  case SEND_OTP_SUCCESS:
   return {
    ...state,
    otpSent: true,
    // You can also store additional data from action.payload if necessary
   };
  case VERIFY_OTP_SUCCESS:
   return {
    ...state,
    userVerified: true,
    // Update state based on verification success
   };

  case SEND_OTP_SUCCESS:
   return {
    ...state,
    otpSent: true,
    // You can also store additional data from action.payload if necessary
   };
  case VERIFY_ADMIN_OTP_SUCCESS:
   return {
    ...state,
    userVerified: true,
    // Update state based on verification success
   };

  case SEND_ADMIN_OTP_SUCCESS:
   return {
    ...state,
    otpSent: true,
    // You can also store additional data from action.payload if necessary
   };

  case SET_USER_VERIFIED:
   return {
    ...state,
    // Update state to reflect user's verified status
    // and any other relevant state updates based on action.payload
   };

  case SET_ADMIN_USER_VERIFIED:
   return {
    ...state,
    // Update state to reflect user's verified status
    // and any other relevant state updates based on action.payload
   };
  case TOGGLE_IS_ADMIN:
   return {
    ...state,
    isAdmin: true,
   };
  case TOGGLE_NOT_ADMIN:
   return {
    ...state,
    isAdmin: false,
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
