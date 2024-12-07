import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
  const [ticketID, setTicketID] = useState("");
  const [validationResult, setValidationResult] = useState(null);

  const validateTicket = async (id) => {
    try {
      const response = await fetch(
        // `https://blank-lisha-adesire-private-limited-d3291de0.koyeb.app/ticketing/api/v1/ticket/scan/${id}`,//TODO: RESTORE
        `https://blank-lisha-adesire-private-limited-d3291de0.koyeb.app/ticketing/api/v1/ticket/check/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to validate the ticket");
      }

      const data = await response.json();
      setValidationResult(data);
    } catch (error) {
      console.error("Validation error:", error);
      setValidationResult({ success: false, error: error.message });
    }
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {

        // Extract ticket details from the QR code text
        const ticketPattern = /^BEGIN:EVTICKET\s+VERSION:(\d+\.\d+)\s+TID:([a-zA-Z0-9_\-]+)\s+END:EVTICKET$/;
        const match = decodedText.trim().match(ticketPattern);
        console.log(decodedText);

        console.log(match);

        if (match) {
          const [, , ticketId] = match;

          setTicketID(ticketId);
          validateTicket(ticketId);
          scanner.clear(); // Stop scanning once a QR code is scanned
        } else {
          setValidationResult("Invalid QR Code format");
          scanner.clear(); // Stop scanning once a QR code is scanned
        }
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader" style={{ width: "300px" }}></div>
      {ticketID && <p>Scanned Ticket ID: {ticketID}</p>}
      {validationResult && (
        <div>
          <h3>Validation Result:</h3>
          <pre>{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
