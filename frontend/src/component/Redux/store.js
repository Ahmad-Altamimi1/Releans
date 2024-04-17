import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authreducer from "./AuthReducer";

const NotiCount = localStorage.getItem("previousNotificationCount") || null;
const data = !!localStorage.getItem("previousNotificationCount");
const initialState = {
  NotiCount,
  data,
};
const store = createStore(authreducer, initialState, applyMiddleware(thunk));

export { store };
