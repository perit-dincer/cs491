import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgYVY-MfUbK_pQo_qrOC6sxXqjDH5j0wY",
  authDomain: "test-a26a7.firebaseapp.com",
  projectId: "test-a26a7",
  storageBucket: "test-a26a7.appspot.com",
  messagingSenderId: "466261405214",
  appId: "1:466261405214:web:421e16b540cc136994880f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app,firebaseConfig.storageBucket);