// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTbQfESOHFamYtpngQh6QQA8nEAwd4ne4",
  authDomain: "portfolio-b321d.firebaseapp.com",
  projectId: "portfolio-b321d",
  storageBucket: "portfolio-b321d.appspot.com",
  messagingSenderId: "644780794630",
  appId: "1:644780794630:web:1e64f6604ebcf27541f487",
  measurementId: "G-PERFV1SGXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
