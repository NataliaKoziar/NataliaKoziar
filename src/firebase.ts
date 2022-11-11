// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc6zqNry7aEL3vmfRB2Aplqv87plR2Gj8",
  authDomain: "users-99b66.firebaseapp.com",
  projectId: "users-99b66",
  storageBucket: "users-99b66.appspot.com",
  messagingSenderId: "1063015777414",
  appId: "1:1063015777414:web:1e6e455053cde9180bbd07"
  // apiKey: "AIzaSyC0IUPmXHmmCwOEplkWpsNid_6tu--rKsg",
  // authDomain: "andriankukr.firebaseapp.com",
  // projectId: "andriankukr",
  // storageBucket: "andriankukr.appspot.com",
  // messagingSenderId: "768413021144",
  // appId: "1:768413021144:web:66f57294538ab78f2eb8ad",
  // measurementId: "G-Y88C4J7T8Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore();