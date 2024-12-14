import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import toast, { Toaster } from "react-hot-toast";
import styles from "./QrScanner.module.css";

const QRScanner = () => {
  const [ticketID, setTicketID] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // Control scanning

  const validateTicket = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/ticket/check/${id}`,
        {
          method: "GET",
        }
      );

      // Always parse the response body as JSON, regardless of the status code
      const data = await response.json().catch(() => {
        // Handle cases where the response is not valid JSON
        throw new Error("Invalid JSON response from the server");
      });

      console.log("Response:", {
        body: data.message,
      });

      if (!response.ok) {
        toast.error(data.message, {
          duration: 4000,
          style: {
            padding: "40px 40px",
            marginTop: "15rem",
          },
        });
        // Log the error response and include it in the validation result
        throw new Error(
          data?.message || `Validation failed with status ${response.status}`
        );
      }

      // If the response is OK, update the validation result
      setValidationResult({ success: true, ...data });
      toast.success("Ticket scanned successfully!", {
        duration: 4000,
        style: {
          padding: "40px 40px",
          marginTop: "15rem",
        },
      });
    } catch (error) {
      console.error("Validation error:", error);
      setValidationResult({
        success: false,
        error: error.message,
      });
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
        if (!isScanning) return; // Ignore if scanning is temporarily paused

        setIsScanning(false); // Stop scanning temporarily

        // Extract ticket details from the QR code text
        const ticketPattern =
          /^BEGIN:EVTICKET\s+VERSION:(\d+\.\d+)\s+TID:([a-zA-Z0-9_\-]+)\s+END:EVTICKET$/;
        const match = decodedText.trim().match(ticketPattern);

        console.log(decodedText);
        console.log(match);

        if (match) {
          const [, , ticketId] = match;

          setTicketID(ticketId);
          validateTicket(ticketId); // Validate the scanned ticket ID
        } else {
          toast.error("Invalid QR Code format");
        }

        // Resume scanning after 2 seconds
        setTimeout(() => {
          setIsScanning(true);
        }, 2000);
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [isScanning]); // Dependency on isScanning to re-render the scanner

  return (
    <div className={styles.container}>
      <Toaster />
      {/* <h1 className={styles.header}>QR Code Scanner</h1> */}
      <div id="reader" style={{ width: "300px" }}></div>
      {ticketID && (
        <p className={styles.ticketID}>Scanned Ticket ID: {ticketID}</p>
      )}
    </div>
  );
};

export default QRScanner;
