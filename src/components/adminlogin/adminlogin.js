import React, { useState } from "react";
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("response.ok:", response.ok);
      console.log("data:", data);
      if (email === "admin@gmail.com" && password === "admin123") {
        navigate("/admindashboard");
      }
       else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred on the platform");
    }
  };

  return (
  
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <input type="submit" value="Login" />
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
