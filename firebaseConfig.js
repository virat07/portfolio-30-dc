// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbi9n479c1MVqiX2-rcAtRWRC-5NeNncw",
  authDomain: "chatresumeapi.firebaseapp.com",
  databaseURL: "https://chatresumeapi-default-rtdb.firebaseio.com",
  projectId: "chatresumeapi",
  storageBucket: "chatresumeapi.appspot.com",
  messagingSenderId: "579311045952",
  appId: "1:579311045952:web:153e8ab23f08b50bc47ea5",
  measurementId: "G-J8CQST5T6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(
  app,
  "https://chatresumeapi-default-rtdb.firebaseio.com/"
);
const storage = getStorage(app, "gs://chatresumeapi.appspot.com");
const db = getFirestore(app);

export { database, storage, db };
