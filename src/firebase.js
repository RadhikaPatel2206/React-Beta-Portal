import firebase from "firebase";

// Initailize App
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7B0M-uC5I1RjbO7w2_5_KmWGSjyTdub4",
    authDomain: "react-user-portal.firebaseapp.com",
    databaseURL: "https://react-user-portal.firebaseio.com",
    projectId: "react-user-portal",
    storageBucket: "react-user-portal.appspot.com",
    messagingSenderId: "753566537705",
    appId: "1:753566537705:web:d498793e02a12844ff1d78",
    measurementId: "G-EVHD1720G4",
});

// Set DB access for the app
export const db = firebaseApp.firestore();
