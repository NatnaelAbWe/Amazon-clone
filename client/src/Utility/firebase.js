import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZXepOlV8uUqAtj_kxCTP1VY2HPPzLmRs",
  authDomain: "e-clone-dd69e.firebaseapp.com",
  projectId: "e-clone-dd69e",
  storageBucket: "e-clone-dd69e.firebasestorage.app",
  messagingSenderId: "348058234140",
  appId: "1:348058234140:web:cefb17d761cdb27b965ed9",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebase.firestore();
