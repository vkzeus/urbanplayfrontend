// src/components/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import Navbar from "./Navbar";


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://urbanplaybackend.onrender.com/login", {
        username: userName,
        password: password,
      });

      console.log(response.data);

      // Store user data in localStorage after successful login
      localStorage.setItem("User", JSON.stringify({
        name: userName,
        balance: 1000, // You can customize or fetch from response if backend returns it
      }));

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed!");
    }
  };

  return (
    <div className="App">
     <Navbar/>
    <>
   
    
      <div className="container">
      <h3 className="login-head">Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
    </div>
  );
}

export default Login;
