import React, { useState } from "react";

import { auth } from "../firebase"; // ✅ Correct import

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "../App.css";

const SignIn = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed Up:", userCredential.user);
    } catch (error) {
      console.error("Sign Up Error:", error.message);
    }
  };
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged In:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow=lg text-center" style={{maxwidth: '400px', width: '100%', borderRadius:'20px'}}>
      <h3 className="mb-3" style={{color: '#4e342e'}}> Welcome</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />
      <button className="btn-btn login-btw w-100" onClick={handleSignUp}>
        Sign Up
      </button>
      <br />
      <button className="btn-bt login-btw w-100" onClick={handleLogin}>
        Login
      </button>

    </div>
    </div>
  )
}

export default SignIn