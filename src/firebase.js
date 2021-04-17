import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCunoiXjLgruQQ5JPBU59Mov3_CYlGbEuQ",
  authDomain: "todo-app-874fe.firebaseapp.com",
  projectId: "todo-app-874fe",
  storageBucket: "todo-app-874fe.appspot.com",
  messagingSenderId: "805273241981",
  appId: "1:805273241981:web:2450671cb9e1e66bf06414",
  measurementId: "G-29BQSC9F47",
});

const db = firebaseApp.firestore();

export default db;
