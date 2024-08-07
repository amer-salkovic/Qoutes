import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/sessions", {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
      navigate("/"); // Nakon uspešnog logina, preusmeriti na početnu stranicu
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
