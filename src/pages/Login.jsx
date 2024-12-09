import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare the request payload
    const requestData = {
      email,
      password,
      deviceToken: "", // Add an empty deviceToken or generate one if required
      userType: "ADMIN", // Explicitly include the userType as "ADMIN"
    };

    console.log("Request being sent:", requestData); // Log the request for debugging

    try {
      // Send the login request
      const response = await axios.post(
        "https://blank-lisha-adesire-private-limited-d3291de0.koyeb.app/ticketing/api/v1/auth/login",
        requestData
      );

      // Extract the accessToken from the nested response structure
      const accessToken = response.data?.data?.accessToken;

      if (accessToken) {
        // Save the accessToken in localStorage
        localStorage.setItem("accessToken", accessToken);

        alert("Login successful! Redirecting to the admin dashboard...");

        // Redirect to the admin dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Access token is missing from the response.");
      }
    } catch (error) {
      console.error("Login failed:", error);

      // Log the error response data if available
      console.error("Error Response Data:", error.response?.data);

      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}> Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
