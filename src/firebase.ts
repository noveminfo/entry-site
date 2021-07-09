import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_KEY,
  authDomain: env.REACT_APP_FIREBASE_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const firestoreTimeStamp =
  firebase.firestore.FieldValue.serverTimestamp();
