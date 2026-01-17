const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mongo:iRQpNhihJLQYWXmQfPFcXAEBJiESTBxL@tramway.proxy.rlwy.net:45931/MLD_bd?authSource=admin";

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

// Health check
app.get("/health", (req, res) => res.send("OK"));

// Serve React
const buildPath = path.join(__dirname, "../front-mld/build");
app.use(express.static(buildPath));

// API
app.use("/user", require("./routes/Routes"));

// React fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Mongo
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });

// Start
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
