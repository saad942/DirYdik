const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* =======================
   PORT
======================= */
const PORT = process.env.PORT;

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("uploads"));

/* =======================
   HEALTH CHECK
======================= */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =======================
   DATABASE
======================= */
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });

/* =======================
   ROUTES
======================= */
app.use("/user", require("./routes/Routes"));

/* =======================
   SERVE REACT
======================= */
const buildPath = path.join(__dirname, "../front-mld/build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
