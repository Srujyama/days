import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "days-todo-app",
  appId: "1:380911256336:web:d556dc074c7b68210c9b95",
  storageBucket: "days-todo-app.firebasestorage.app",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "days-todo-app.firebaseapp.com",
  messagingSenderId: "380911256336",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
