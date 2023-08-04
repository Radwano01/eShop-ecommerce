
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "lamastore-b4681.firebaseapp.com",
  projectId: "lamastore-b4681",
  storageBucket: "lamastore-b4681.appspot.com",
  messagingSenderId: "180699111388",
  appId: "1:180699111388:web:739e3deed71cd1cd27b919",
  measurementId: "G-DXJLDVTX9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export default app

export {auth, db, storage}

