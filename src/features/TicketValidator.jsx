import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const TicketValidator = () => {
  const [ticketID, setTicketID] = useState(""); // Input field state
  const [validationResult, setValidationResult] = useState(null); // Validation state

  const validateTicket = async (id) => {
    try {
      // Display a loading toast
      toast.loading("Validating ticket...");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/ticket/scan/${id}`,
        {
          method: "GET",
        }
      );

      // Parse the response
      const data = await response.json().catch(() => {
        throw new Error("Invalid JSON response from the server");
      });

      console.log("Response:", {
        body: data.message,
      });

      // Check if the response is successful
      if (!response.ok) {
        toast.dismiss(); // Dismiss the loading toast
        toast.error(
          data.message || `Validation failed (status ${response.status})`
        );
        setValidationResult({ success: false, error: data.message });
        return;
      }

      // Validation success
      toast.dismiss(); // Dismiss the loading toast
      toast.success("Ticket validated successfully!", {
        duration: 4000,
        style: {
          padding: "40px 40px",
          marginTop: "15rem",
        },
      });
      setValidationResult({ success: true, ...data });
    } catch (error) {
      console.error("Validation error:", error);
      toast.dismiss(); // Dismiss the loading toast
      toast.error(error.message || "An error occurred during validation", {
        duration: 4000,
        style: {
          padding: "40px 40px",
          marginTop: "15rem",
        },
      });
      setValidationResult({
        success: false,
        error: error.message,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketID.trim()) {
      toast.error("Ticket ID cannot be empty!");
      return;
    }
    validateTicket(ticketID); // Validate the entered ticket ID
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Toaster /> {/* Toast container */}
      <h1>Manual Ticket Validator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticketID">Enter Ticket ID:</label>
          <input
            type="text"
            id="ticketID"
            value={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
            placeholder="Type ticket ID here..."
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Validate Ticket
        </button>
      </form>
      {/* {validationResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>Validation Result:</h3>
          <pre>{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default TicketValidator;
