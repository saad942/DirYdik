const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
 
require('dotenv').config();

const app = express();
const PORT = 3002; 
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); 
app.use(express.static('uploads')); 

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined");
  process.exit(1);
}
// MongoDB connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err.message);
        process.exit(1); // Exit the process if unable to connect
    });

app.use('/user', require('./routes/Routes'));

const router = require('./routes/Routes');  // Make sure this path is correct
app.use(router)

app.use(express.static(path.join(__dirname, "../front-mld/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../front-mld/build/index.html")
  );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
