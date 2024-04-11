// authReducer.js
const initialState = {
  NotiCount:
    JSON.parse(localStorage.getItem("previousNotificationCount")) || null,
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
