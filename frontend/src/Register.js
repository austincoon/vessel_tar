import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";
import "./Register.css"; // Ensure consistent styling

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    phone_number: "",
    city: "",
    state: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "email" && value.length > 100) {
      setErrorMessage("Email cannot exceed 100 characters.");
      return;
    }
    if (name === "password" && value.length > 255) {
      setErrorMessage("Password is too long.");
      return;
    }
    if ((name === "first_name" || name === "last_name") && value.length > 50) {
      setErrorMessage(`${name.replace("_", " ")} cannot exceed 50 characters.`);
      return;
    }
    if ((name === "city" || name === "state") && value.length > 100) {
      setErrorMessage(`${name.replace("_", " ")} cannot exceed 100 characters.`);
      return;
    }
    if (name === "phone_number" && value.length > 20) {
      setErrorMessage("Phone number cannot exceed 20 characters.");
      return;
    }

    setErrorMessage(""); // Clear error message if validation passes
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        // Handle detailed validation errors
        if (Array.isArray(data.detail)) {
          const errors = data.detail.map((err) => {
            const field = err.loc ? err.loc[1] : "Unknown field"; // Get the field name
            return `${field}: ${err.msg}`;
          });
          setErrorMessage(errors.join(", "));
        } else {
          setErrorMessage(data.detail || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration.");
    }
  };
  
  

  return (

    <div className="login-page-container">
    <Header />

    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            <option value="Property Owner">Property Owner</option>
            <option value="Managing Partner">Managing Partner</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
