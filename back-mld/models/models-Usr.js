// models/models-Usr.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true } ,
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String},
    phone: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
