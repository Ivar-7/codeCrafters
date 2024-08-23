import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB02W4baGI6L5WY5TmFzwK3z9YaSKgupiI",
  authDomain: "codecrafters-51c8d.firebaseapp.com",
  projectId: "codecrafters-51c8d",
  storageBucket: "codecrafters-51c8d.appspot.com",
  messagingSenderId: "655520304936",
  appId: "655520304936:web:e04cf4164877c224620a1d",
  measurementId: "G-STW3KGQ42K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Make sure to import `getAnalytics` from 'firebase/analytics'
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, db, auth, storage, googleProvider, facebookProvider };
