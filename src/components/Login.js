import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConstants from "./api/ApiConstants"; // Import the modified ApiConstants

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiConstants.post(
        "/auth/login",
        { username: email, password },
      );

      const data = response.data;

      if (data && data.token) {
        // Store the token in localStorage after successful login
        localStorage.setItem("authToken", data.token);

        // Navigate to the user page after storing the token
        navigate("/user", { state: { email: email } });
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Gmail</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail"
              required
              style={styles.input}
            />
          </div>
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
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <button 
          onClick={() => navigate("/register")} 
          style={styles.registerButton}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}

const styles = {
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
  registerButton: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#008CBA",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Login;
