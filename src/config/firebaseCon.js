// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB02W4baGI6L5WY5TmFzwK3z9YaSKgupiI",
  authDomain: "codecrafters-51c8d.firebaseapp.com",
  projectId: "codecrafters-51c8d",
  storageBucket:"codecrafters-51c8d.appspot.com",
  messagingSenderId: "655520304936",
  appId: "655520304936:web:e04cf4164877c224620a1d",
  measurementId: "G-STW3KGQ42K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
export default app;
