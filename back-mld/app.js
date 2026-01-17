const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// ✅ ROOT RESPONSE (CRITICAL FOR RAILWAY)
app.get("/", (req, res) => {
  res.status(200).send("App is running");
});

// health
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

// api
app.use("/user", require("./routes/Routes"));

// react
const buildPath = path.join(__dirname, "../front-mld/build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// start
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
