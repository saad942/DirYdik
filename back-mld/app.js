const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongo:iRQpNhihJLQYWXmQfPFcXAEBJiESTBxL@tramway.proxy.rlwy.net:45931/MLD_bd?authSource=admin";
console.log("Mongo URI:", MONGODB_URI);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  });

// API routes
app.use("/user", require("./routes/Routes"));

// Serve React build
app.use(express.static(path.join(__dirname, "../front-mld/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../front-mld/build", "index.html")
  );
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log("Server running on port", PORT)
);
