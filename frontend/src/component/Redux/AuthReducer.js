// authReducer.js
const initialState = {
  NotiCount: localStorage.getItem("previousNotificationCount") || 0,
  data: !!localStorage.getItem("previousNotificationCount"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Send_CountSUCCESS":
      localStorage.setItem("previousNotificationCount", action.payload);

      return {
        ...state,
        NotiCount: action.payload,
        data: true,
      };

    default:
      return state;
  }
};

export default authReducer;
