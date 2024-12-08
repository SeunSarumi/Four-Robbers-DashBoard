import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      // Extract the relevant data from the response
      const { token, userType } = response.data;

      // Validate the userType and handle successful login
      if (token && userType === "ADMIN") {
        localStorage.setItem("authToken", token); // Save token for session management
        localStorage.setItem("userType", userType); // Save userType for role management

        alert("Login successful! Redirecting to the admin dashboard...");

        navigate("/dashboard");
      } else {
        throw new Error(
          `Unauthorized access. Expected userType to be "ADMIN", but received: ${userType}`
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
