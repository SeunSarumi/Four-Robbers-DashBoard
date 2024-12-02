import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

function ScannerComp() {
  const [scannedCode, setScannedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // This function is called when a QR code is successfully scanned
  const handleScan = (data) => {
    if (data) {
      setScannedCode(data); // Save the scanned code
    }
  };

  // This function handles any errors from the QR scanner
  const handleError = (err) => {
    console.error(err);
  };

  // This function sends the scanned code to the external API for validation
  const validateTicket = async () => {
    if (!scannedCode) {
      return;
    }

    setLoading(true);
    try {
      // Using the Fetch API to send a POST request to the external API
      const response = await fetch(
        "https://your-api-endpoint.com/validate-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrCode: scannedCode }), // Pass the scanned code in the body
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const data = await response.json();

      if (data.valid) {
        setValidationMessage("Ticket is valid!");
      } else {
        setValidationMessage("Invalid ticket.");
      }
    } catch (error) {
      console.error("Error validating ticket:", error);
      setValidationMessage("Failed to validate ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Scan Ticket QR Code</h2>
      <Scanner
        onScan={handleScan} // Handle scan results
        onError={handleError} // Handle any errors
        style={{ width: "100%" }} // Style the QR scanner
      />
      {scannedCode && (
        <div>
          <p>Scanned Code: {scannedCode}</p>
          {loading ? (
            <p>Validating...</p>
          ) : (
            <button onClick={validateTicket}>Validate Ticket</button>
          )}
        </div>
      )}
      {validationMessage && <p>{validationMessage}</p>}
    </div>
  );
}

export default ScannerComp;
