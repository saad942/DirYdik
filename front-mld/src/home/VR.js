import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/verify/${token}`);
        setMessage(res.data.message);
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, ...statusStyles[status] }}>
        <div style={styles.icon}>
          {status === "loading" && <LoadingSpinner />}
          {status === "success" && <SuccessIcon />}
          {status === "error" && <ErrorIcon />}
        </div>
        <h1 style={styles.title}>
          {status === "loading" ? "Verifying..." : "Email Verification"}
        </h1>
        <p style={styles.message}>{message}</p>
        {status !== "loading" && (
          <Link to="/" style={styles.button}>
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div style={spinnerStyle}>
    <div style={spinnerCircle}></div>
  </div>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 64, height: 64, color: "#4caf50" }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 64, height: 64, color: "#f44336" }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "3rem 2.5rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: 12,
    fontWeight: "700",
    color: "#222",
  },
  message: {
    fontSize: "1.1rem",
    marginBottom: 24,
    color: "#555",
    minHeight: 48,
  },
  button: {
    display: "inline-block",
    padding: "12px 30px",
    borderRadius: 30,
    backgroundColor: "#667eea",
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 5px 15px rgba(102,126,234,0.5)",
    transition: "background-color 0.3s ease",
  },
};

const statusStyles = {
  loading: {
    backgroundColor: "#f0f4ff",
  },
  success: {
    backgroundColor: "#e6f4ea",
  },
  error: {
    backgroundColor: "#fdecea",
  },
};

const spinnerStyle = {
  display: "inline-block",
  width: 64,
  height: 64,
  position: "relative",
};

const spinnerCircle = {
  boxSizing: "border-box",
  display: "block",
  position: "absolute",
  width: 48,
  height: 48,
  margin: 8,
  border: "4px solid #667eea",
  borderRadius: "50%",
  borderColor: "#667eea transparent transparent transparent",
};

export default VerifyEmail;
