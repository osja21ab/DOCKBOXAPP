
// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, browserLocalPersistence } from "firebase/auth";

// Your Firebase configuration here
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up state persistence for authentication
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

// Get a reference to the Firebase Realtime Database
const db = getDatabase(app);

export { db, auth };
