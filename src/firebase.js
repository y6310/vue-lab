// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUJii9j0PdEZ8xynkadr9nkt1b1BCQ4_A",
  authDomain: "vue-labo-1f152.firebaseapp.com",
  projectId: "vue-labo-1f152",
  storageBucket: "vue-labo-1f152.appspot.com",
  messagingSenderId: "949947381619",
  appId: "1:949947381619:web:bd227eb64bfb150218b706"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);