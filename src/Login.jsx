import { useState } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmail = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      const code = err.code;
      if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (code === "auth/email-already-in-use") {
        setError("Account already exists");
      } else if (code === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch {
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <h1>DAYS</h1>
          <div className="login-divider" />
          <p>your daily ritual</p>
        </div>

        <form onSubmit={handleEmail} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn-primary">
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="login-separator">
          <span>or</span>
        </div>

        <button className="login-btn-google" onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="login-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => { setIsSignup(!isSignup); setError(""); }}>
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
