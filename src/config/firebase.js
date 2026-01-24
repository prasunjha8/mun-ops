import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // PASTE YOUR KEYS FROM FIREBASE CONSOLE HERE
  apiKey: "AIzaSyDbYtK6mIO0BlNQfTvnWYxSvo6TxNXzYHE",
  authDomain: "mun-ops.firebaseapp.com",
  projectId: "mun-ops",
  storageBucket: "mun-ops.firebasestorage.app",
  messagingSenderId: "588416766043",
  appId: "1:588416766043:web:0f712a495ef6452ed02f7e"
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);