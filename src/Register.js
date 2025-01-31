import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConstants from "./components/api/ApiConstants";

function Register() {
  const [username, setUsername] = useState(""); // Add username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      // Sending username as email and including encrypted email and password in the payload
      const response = await ApiConstants.post(
        "/auth/register",
        { 
          username, 
          email:email, 
          password: password
        }
      );

      const { data } = response;

      if (data) {
        // Display the error message from the response (if any)
        setError(data || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Register failed", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          
          {/* Username Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Employee Name </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={styles.input}
            />
          </div>
          
          {/* Gmail (Email) Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Gmail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail"
              required
              style={styles.input}
            />
          </div>
          
          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          
          <button type="submit" style={styles.button}>Register</button>
          
          <button
            style={styles.backToLogin}
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  backToLogin: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#f44336",  // Red color for "Back to Login"
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7fc",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Register;
