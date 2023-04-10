import { PROFILE_LOADED, LOGOUT, TOKEN_LOADED } from "../types";

export default (state, action) => {
 switch (action.type) {
  case PROFILE_LOADED:
   return {
    ...state,
    isAuthenticated: true,
    profile: action.payload,
   };

  case TOKEN_LOADED:
   return {
    ...state,
    token: action.payload,
   };
  case LOGOUT:
   return {
    ...state,
    isAuthenticated: false,
    profile: null,
   };
  default:
   return state;
 }
};
