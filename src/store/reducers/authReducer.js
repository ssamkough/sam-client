const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login successful!");
      return { ...state, authError: null };
    case "LOGIN_ERROR":
      console.log("Failed to login! Error:\n", action.err);
      return { ...state, authError: "Login failed!" };
    case "LOGOUT_SUCCESS":
      console.log("Logout successful!");
      return { ...state, authError: null };
    case "LOGOUT_ERROR":
      console.log("Failed to logout! Error:\n", action.err);
      return { ...state, authError: "Logout failed!" };
    default:
      return state;
  }
};

export default authReducer;
