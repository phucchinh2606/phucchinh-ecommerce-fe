import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.loginUser(formData);
      if (response.status === 200) {
        setMessage("Login successfully");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);

        console.log(
          "LoginPage - Login successful, triggering authChange event"
        );
        // Trigger custom event để Navbar cập nhật
        window.dispatchEvent(new Event("authChange"));

        setTimeout(() => {
          navigate("/profile");
        }, 4000);
      }
    } catch (error) {
      setMessage(
        error.response?.data.message || error.message || "Unable to login"
      );
    }
  };

  return (
    <div className="register-page">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <a href="/login">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
