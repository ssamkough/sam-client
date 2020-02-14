import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  post: postReducer
});

export default rootReducer;
