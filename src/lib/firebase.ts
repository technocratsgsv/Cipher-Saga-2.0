import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBMcEQtQzM3qfaJah_IiB8pSOoSMqiE_jk",
    authDomain: "iitm-cs.firebaseapp.com",
    projectId: "iitm-cs",
    storageBucket: "iitm-cs.firebasestorage.app",
    messagingSenderId: "674187742486",
    appId: "1:674187742486:web:49e5cb9d3fb767448b9437",
    measurementId: "G-MRFQRV3SQF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();