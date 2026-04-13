import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "days-todo-68490",
  appId: "1:873274882928:web:36535b55933a9c2f1eadb5",
  storageBucket: "days-todo-68490.firebasestorage.app",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "days-todo-68490.firebaseapp.com",
  messagingSenderId: "873274882928",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
