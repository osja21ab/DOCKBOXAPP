// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUgSNJZiaxnFmpFjFsujj-02Z5GYENlpU",
  authDomain: "dockbox-c4ca6.firebaseapp.com",
  databaseURL: "https://dockbox-c4ca6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dockbox-c4ca6",
  storageBucket: "dockbox-c4ca6.appspot.com",
  messagingSenderId: "713038131529",
  appId: "1:713038131529:web:3b50a891d2f26ce227ea98",
  measurementId: "G-8FK1Z6EH00"
};

export default fireBase;

// Initialize Firebase
const fireBase = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBase);