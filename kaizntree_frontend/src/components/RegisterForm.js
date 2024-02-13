import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://18.222.150.88:8000/api/register/", {
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          className="registration-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="registration-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="registration-button" type="submit">
          Register
        </button>
        <p className="registration-text">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
      {error && <p className="registration-error">{error}</p>}
    </div>
  );
};

export default RegistrationForm;
