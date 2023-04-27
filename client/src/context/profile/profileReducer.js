import {
 POST_THS,
 ADD_CLIENT,
 PUT_CANOPY,
 CLEAR_CLIENT,
 GET_PROFILES,
 SET_TASK,
 SEND_MESSAGE,
 GET_MESSAGES,
 FILTER_MESSAGES,
 FILTER_TASKS,
 RANGE_MESSAGES,
 RANGE_TASKS,
 UPDATE_MESSAGE,
 DELETE_MESSAGE,
 GET_TASKS,
 GET_ZIP,
 CLEAR_TASK,
 GET_RULES,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case POST_THS:
   return {
    ...state,
    client: action.payload,
   };

  case GET_ZIP:
   return {
    ...state,
    zipdata: action.payload,
   };

  case GET_RULES:
   return {
    ...state,
    rules: action.payload,
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

  case RANGE_TASKS:
   return {
    ...state,
    range: state.tasks.filter(
     (m) =>
      new Date(m.date) >= new Date(action.payload.taskStart) &&
      new Date(m.date) <= new Date(action.payload.taskEnd)
    ),
   };
  case FILTER_TASKS:
   return {
    ...state,
    filtered: state.calls.filter((task) => {
     const regex = new RegExp(`${action.payload}`, "gi");
     return task.description.match(regex);
    }),
   };
  case PUT_CANOPY:
   return {
    ...state,
    client: action.payload,
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

  case CLEAR_TASK:
   return {
    ...state,
    tasks: state.tasks.filter((task) => task._id !== action.payload._id),
   };

  case GET_MESSAGES:
   return {
    ...state,
    messages: action.payload,
   };

  case GET_TASKS:
   return {
    ...state,
    tasks: action.payload,
   };
  case SET_TASK:
   return {
    ...state,
    client: action.payload,
   };
  case ADD_CLIENT:
   return {
    ...state,
    clientList: [...state.clientList, action.payload],
   };

  case GET_PROFILES:
   return {
    ...state,
    clientList: action.payload,
   };

  case CLEAR_CLIENT:
   return {
    ...state,
    client: null,
   };

  default:
   return state;
 }
};
