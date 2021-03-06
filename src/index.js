/* eslint-disable import/first */
require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import firebase from "firebase";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded
} from "react-redux-firebase";
import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore
} from "redux-firestore";

import App from "./App";
import rootReducer from "./store/reducers/rootReducer";
import fbConfig from "./config/fbConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) {
    return <div className="container">Loading screen...</div>;
  }
  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
