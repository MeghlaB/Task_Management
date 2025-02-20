// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
<<<<<<< HEAD
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId, 
    storageBucket: import.meta.env.VITE_storageBucket, 
    messagingSenderId: import.meta.env.VITE_messagingSenderId, 
    appId: import.meta.env.VITE_appId, 
  };
  
  // Initialize Firebase
=======
  apiKey: "AIzaSyAoTIaREWm4uMNi6ekEijrzor40kOv2o08",
  authDomain: "task-management-3e540.firebaseapp.com",
  projectId: "task-management-3e540",
  storageBucket: "task-management-3e540.firebasestorage.app",
  messagingSenderId: "476000189060",
  appId: "1:476000189060:web:ea140350716e4c19b260d1"
};

// Initialize Firebase
>>>>>>> 01521d18853f4bea5068865126898dc1ce2821ec
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
