import express from "express";
import cors from "cors";
import { db } from "./mockDb.js"; // Note the `.js` extension

const app = express();

// Middleware to parse JSON and handle cross-origin requests
app.use(express.json());
app.use(cors());

// Route to fetch sourceGridData
app.get("/api/sourceGridData", (req, res) => {
  res.json(db.sourceGridData);
});

// Route to update sourceGridData
app.put("/api/sourceGridData", (req, res) => {
  const newData = req.body;
  if (!Array.isArray(newData)) {
    return res.status(400).json({ error: "Invalid data format, expected an array" });
  }
  db.sourceGridData = newData;
  res.json(db.sourceGridData);
});

// Route to fetch targetGridData
app.get("/api/targetGridData", (req, res) => {
  res.json(db.targetGridData);
});

// Route to update targetGridData
app.put("/api/targetGridData", (req, res) => {
  const newData = req.body;
  if (!Array.isArray(newData)) {
    return res.status(400).json({ error: "Invalid data format, expected an array" });
  }
  db.targetGridData = newData;
  res.json(db.targetGridData);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Mock server is running at http://localhost:${PORT}`));
