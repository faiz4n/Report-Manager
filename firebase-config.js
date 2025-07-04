import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWbDJQ-v1d_V9Za9qi4jTUpibqp4FRnwk",
  authDomain: "report-manager-986ad.firebaseapp.com",
  projectId: "report-manager-986ad",
  storageBucket: "report-manager-986ad.firebasestorage.app",
  messagingSenderId: "683441248190",
  appId: "1:683441248190:web:bc15056485c8f71d060bef",
  measurementId: "G-WSY2CPJ0PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
