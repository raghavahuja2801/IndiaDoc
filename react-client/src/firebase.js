// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc-k5yOhj2EmrANKHG-9n6qJGhe0SIfjk",
  authDomain: "global-health-platform-975a2.firebaseapp.com",
  projectId: "global-health-platform-975a2",
  storageBucket: "global-health-platform-975a2.firebasestorage.app",
  messagingSenderId: "140523868697",
  appId: "1:140523868697:web:d9785aaa217b7c058f9088",
  measurementId: "G-NNR83P2R29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);