const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Pass mongoose instance to mongoose-sequence

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  zip: { type: String, required: true },
  address: { type: String, required: true },
  cleaningType: { type: String, required: true },
  extra: {type: [String], required: true},
  date: { type: String, required: true },
  houre: { type: String, required: true },
  prix: { type: String, required: true },
  room: { type: String, required: true },
  status: { type: String, default: "pending", },
});

// Apply the AutoIncrement plugin to auto-increment the 'bookId' field
userSchema.plugin(AutoIncrement, { inc_field: 'bookId' });

// Create and export the User model
const User = mongoose.model('Book', userSchema); // Use userSchema here instead of bookSchema

module.exports = User;
