const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* =======================
   PORT (CRITICAL)
======================= */
const PORT =3002;

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

/* =======================
   ROOT + HEALTH (CRITICAL)
======================= */


app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =======================
   DATABASE
======================= */
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mongo:iRQpNhihJLQYWXmQfPFcXAEBJiESTBxL@tramway.proxy.rlwy.net:45931/MLD_bd?authSource=admin";

console.log("Mongo URI:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("Mongo error:", err.message);
    process.exit(1);
  });

/* =======================
   API ROUTES
======================= */
app.use("/user", require("./routes/Routes"));

/* =======================
   SERVE REACT BUILD
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
