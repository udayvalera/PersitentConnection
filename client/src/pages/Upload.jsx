import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [processingId, setProcessingId] = useState(
    localStorage.getItem("processing_id")
  );
  const [status, setStatus] = useState(
    localStorage.getItem("upload_status") || "Not started"
  );

  useEffect(() => {
    if (processingId) {
      setIsUploading(true); // Keep button disabled if a process is running

      const interval = setInterval(() => {
        fetch(`http://localhost:5000/status/${processingId}`)
          .then((res) => res.json())
          .then((data) => {
            setStatus(data.status);
            localStorage.setItem("upload_status", data.status); // Store the status

            if (data.status === "completed") {
              clearInterval(interval);
              localStorage.removeItem("processing_id");
              localStorage.removeItem("upload_status");
              setProcessingId(null);
              setIsUploading(false);
            }
          })
          .catch((err) => console.error("Error fetching status:", err));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [processingId]);

  const handleUpload = () => {
    if (isUploading) return;

    setIsUploading(true);
    setStatus("Processing...");
    localStorage.setItem("upload_status", "Processing...");

    fetch("http://localhost:5000/upload", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("processing_id", data.processing_id);
        setProcessingId(data.processing_id);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        setIsUploading(false);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Upload Page</h1>
      <p>Click the button to simulate file upload.</p>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={{
          padding: "10px 20px",
          cursor: isUploading ? "not-allowed" : "pointer",
          background: isUploading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </button>

      {processingId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status: {status}</h3>
          <p>Processing ID: {processingId}</p>
          <p>
            Upload is in progress. You can check the status here or on the Home
            page.
          </p>
          <Link to="/">
            <button
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Return to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Upload;
