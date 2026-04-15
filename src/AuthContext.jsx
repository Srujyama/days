import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const signupWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, loginWithEmail, signupWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
