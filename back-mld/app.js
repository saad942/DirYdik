const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT; // ⚠️ IMPORTANT

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mongo:iRQpNhihJLQYWXmQfPFcXAEBJiESTBxL@tramway.proxy.rlwy.net:45931/MLD_bd?authSource=admin";

console.log("Mongo URI:", MONGODB_URI);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

/* =======================
   SERVE REACT FIRST
======================= */
const buildPath = path.join(__dirname, "../front-mld/build");
app.use(express.static(buildPath));

/* =======================
   API ROUTES
======================= */
app.use("/user", require("./routes/Routes"));

/* =======================
   REACT FALLBACK
======================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  });

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
