// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBozVVinEK5nlXi4xR7_ZE_2tQeSMwN8Us",
  authDomain: "login-auth-366ba.firebaseapp.com",
  projectId: "login-auth-366ba",
  storageBucket: "login-auth-366ba.firebasestorage.app",
  messagingSenderId: "559443453077",
  appId: "1:559443453077:web:c5689dced0e72da81ce79c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;