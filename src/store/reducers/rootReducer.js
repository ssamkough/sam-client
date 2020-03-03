import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import projectReducer from "./projectReducer";
import serviceReducer from "./serviceReducer";
import articleReducer from "./articleReducer";
import personReducer from "./personReducer";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  post: postReducer,
  project: projectReducer,
  service: serviceReducer,
  article: articleReducer,
  person: personReducer
});

export default rootReducer;
