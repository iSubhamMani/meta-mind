// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbsSZtYLHBxM24neI40L0iyrFAM9cb0CI",
  authDomain: "meta-mind-36dee.firebaseapp.com",
  projectId: "meta-mind-36dee",
  storageBucket: "meta-mind-36dee.appspot.com",
  messagingSenderId: "640679017759",
  appId: "1:640679017759:web:3aedb3650cae44eaec442a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
