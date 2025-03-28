import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [status, setStatus] = useState(
    localStorage.getItem("upload_status") || "Not started"
  );
  const [processingId, setProcessingId] = useState(
    localStorage.getItem("processing_id")
  );

  useEffect(() => {
    if (processingId) {
      const interval = setInterval(() => {
        fetch(`http://localhost:5000/status/${processingId}`)
          .then((res) => res.json())
          .then((data) => {
            setStatus(data.status);
            localStorage.setItem("upload_status", data.status); // Persist status in local storage

            if (data.status === "completed") {
              clearInterval(interval);
              localStorage.removeItem("processing_id");
              localStorage.removeItem("upload_status");
              setProcessingId(null);
            }
          })
          .catch((err) => console.error("Error fetching status:", err));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [processingId]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Welcome! You can check the status of your upload here.</p>

      <h3>Status: {status}</h3>

      {processingId && <p>Processing ID: {processingId}</p>}

      <Link to="/upload">
        <button
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Go to Upload Page
        </button>
      </Link>
    </div>
  );
};

export default Home;
