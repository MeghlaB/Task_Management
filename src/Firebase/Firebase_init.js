// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoTIaREWm4uMNi6ekEijrzor40kOv2o08",
  authDomain: "task-management-3e540.firebaseapp.com",
  projectId: "task-management-3e540",
  storageBucket: "task-management-3e540.firebasestorage.app",
  messagingSenderId: "476000189060",
  appId: "1:476000189060:web:ea140350716e4c19b260d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
