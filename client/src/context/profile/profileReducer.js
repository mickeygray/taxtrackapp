import {
 POST_THS,
 ADD_CLIENT,
 PUT_CANOPY,
 CLEAR_CLIENT,
 GET_PROFILES,
 SEND_MESSAGE,
 GET_MESSAGES,
 FILTER_MESSAGES,
 RANGE_MESSAGES,
 UPDATE_MESSAGE,
 DELETE_MESSAGE,
 UPLOAD_FILE,
 SET_PROFILE,
 SET_MILESTONES,
 CLEAR_PROFILE,
 CLEAR_PROFILES,
 UPDATE_PROFILE,
 SET_QUAL,
 CLEAR_QUAL,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case POST_THS:
   return {
    ...state,
    profile: action.payload,
   };

  case CLEAR_PROFILE:
   return {
    ...state,
    profile: null,
   };
  case UPDATE_PROFILE:
   return {
    ...state,
    profile: action.payload,
   };

  case CLEAR_PROFILES:
   return {
    ...state,
    profileList: [],
   };

  case SET_PROFILE:
   return {
    ...state,
    profile: action.payload,
   };

  case CLEAR_QUAL:
   return {
    ...state,
    oicChartData: null,
   };

  case SET_QUAL:
   return {
    ...state,
    oicChartData: action.payload,
   };

  case SET_MILESTONES:
   return {
    ...state,
    milestones: action.payload,
   };
  case UPLOAD_FILE:
   return {
    ...state,
    newProfile: action.payload,
   };

  case FILTER_MESSAGES:
   return {
    ...state,
    filtered: state.messages.filter((m) => {
     const regex = new RegExp(`${action.payload}`, "gi");
     return m.message.match(regex);
    }),
   };

  case RANGE_MESSAGES:
   return {
    ...state,
    range: state.messages.filter(
     (m) =>
      new Date(m.date) >= new Date(action.payload.messageStart) &&
      new Date(m.date) <= new Date(action.payload.messageEnd)
    ),
   };

  case PUT_CANOPY:
   return {
    ...state,
    profile: action.payload,
   };

  case SEND_MESSAGE:
   return {
    ...state,
   };

  case UPDATE_MESSAGE:
   return {
    ...state,
    messages: action.payload.messages,
   };

  case DELETE_MESSAGE:
   return {
    ...state,
    messages: state.messages.filter(
     (message) => message._id !== action.payload._id
    ),
   };

  case GET_MESSAGES:
   return {
    ...state,
    messages: action.payload,
   };

  case ADD_CLIENT:
   return {
    ...state,
    profileList: [...state.profileList, action.payload],
   };

  case GET_PROFILES:
   return {
    ...state,
    profileList: action.payload,
   };

  case CLEAR_CLIENT:
   return {
    ...state,
    profile: null,
   };

  default:
   return state;
 }
};
