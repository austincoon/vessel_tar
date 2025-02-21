import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // styling
// Import your downloaded icons
import EyeIcon from "./assets/eye-solid.svg";
import EyeSlashIcon from "./assets/eye-slash-solid.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token, () => {
          navigate("/dashboard");
        });
      } else {
        setErrorMessage(data.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-field">
            <label>Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="password-input"
              />
              <img
                src={showPassword ? EyeSlashIcon : EyeIcon}
                alt={showPassword ? "Hide Password" : "Show Password"}
                className="toggle-password-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="register-account">
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;
