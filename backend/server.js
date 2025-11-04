require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect routes
const testRoute = require("./routes/testRoute");
const codeAnalysisRoute = require("./routes/CodeRoutes"); // <-- renamed for consistency

app.use("/api/test", testRoute);
app.use("/api/code", codeAnalysisRoute);

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("🚀 CodeGuardian AI-Lite backend is running successfully!");
});

// ✅ MongoDB connection (optional)
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/codeguardian";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
