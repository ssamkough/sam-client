import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore
} from "redux-firestore";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "./styles/index.css";
import App from "./App";
import rootReducer from "./store/reducers/rootReducer";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
