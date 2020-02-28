export const login = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", err });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signOut();
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (err) {
      dispatch({ type: "LOGOUT_ERROR" });
    }
  };
};
