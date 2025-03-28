const express = require("express");
const multer = require("multer");
const { Queue, Worker } = require("bullmq");
const cors = require("cors");
const redis = require("redis");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });
const processingQueue = new Queue("documentProcessingQueue", {
  connection: { host: "localhost", port: 6379 },
});

let processingStatus = {}; // In-memory status tracking

app.post("/upload", upload.single("document"), async (req, res) => {
  const processingId = Date.now().toString(); // Generate unique ID
  processingStatus[processingId] = "processing";

  await processingQueue.add("processDocument", { processingId });

  res.json({ processing_id: processingId });
});

app.get("/status/:processingId", (req, res) => {
  const { processingId } = req.params;
  res.json({ status: processingStatus[processingId] || "not found" });
});

// Background worker
new Worker(
  "documentProcessingQueue",
  async (job) => {
    const { processingId } = job.data;
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Simulate processing delay
    processingStatus[processingId] = "completed";
  },
  { connection: { host: "localhost", port: 6379 } }
);

app.listen(5000, () => console.log("Server running on port 5000"));
