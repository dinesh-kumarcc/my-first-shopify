import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPJ7hOVCU6dXGyfrLlGVhu0L0ukVQNKfA",
    authDomain: "login-to-weather.firebaseapp.com",
    projectId: "login-to-weather",
    storageBucket: "login-to-weather.appspot.com",
    messagingSenderId: "725217149992",
    appId: "1:725217149992:web:83f2fa79794cf91a9c611d",
    measurementId: "G-LNG5Z4BFVH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
