import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Login successful!");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Registration successful! You are now logged in.");
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("You have signed out.");
    } catch (error) {
      console.error("Error during sign out:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      {!user ? (
        <div>
          <h2>{isRegistering ? "Sign Up" : "Login"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering ? (
            <button onClick={handleSignUp}>Sign Up</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </div>
      ) : (
        <div className="welcome-section">
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
