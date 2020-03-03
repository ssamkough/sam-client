import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "sam-api-267023.firebaseapp.com",
  databaseURL: "https://sam-api-267023.firebaseio.com",
  projectId: "sam-api-267023",
  storageBucket: "sam-api-267023.appspot.com",
  messagingSenderId: "720154236286",
  appId: "1:720154236286:web:a931318ed50ed7cd734f2f",
  measurementId: "G-V0KDMTMWBB"
};

firebase.initializeApp(config);

firebase.firestore().settings({});

export default firebase;
