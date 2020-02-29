import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import projectReducer from "./projectReducer";
import serviceReducer from "./serviceReducer";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  post: postReducer,
  project: projectReducer,
  service: serviceReducer
});

export default rootReducer;
