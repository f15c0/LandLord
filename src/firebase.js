// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaxl1ttieaYeZswPKtILCDOatUz5z7cLk",
  authDomain: "realtor-45024.firebaseapp.com",
  projectId: "realtor-45024",
  storageBucket: "realtor-45024.appspot.com",
  messagingSenderId: "212016127638",
  appId: "1:212016127638:web:a958afe55c11e5b4302cb7"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();