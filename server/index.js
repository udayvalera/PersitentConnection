const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const processingStatus = {}; // In-memory store

app.post("/upload", (req, res) => {
  const processingId = Date.now().toString();
  processingStatus[processingId] = "processing";

  // Simulate processing with a 30-second delay
  setTimeout(() => {
    processingStatus[processingId] = "completed";
  }, 30000);

  res.json({ processing_id: processingId });
});

app.get("/status/:processingId", (req, res) => {
  const status = processingStatus[req.params.processingId] || "not found";
  res.json({ status });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
