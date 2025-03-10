import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1kW57JODAX9F1uWuYOp-o9LtWgdp3Biw",
    authDomain: "ciphersaga-gsv.firebaseapp.com",
    databaseURL: "https://ciphersaga-gsv-default-rtdb.firebaseio.com",
    projectId: "ciphersaga-gsv",
    storageBucket: "ciphersaga-gsv.firebasestorage.app",
    messagingSenderId: "1028866915285",
    appId: "1:1028866915285:web:38fa18229daf6f8ee29b5c",
    measurementId: "G-K5MTVTEW0J"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();