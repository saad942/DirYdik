const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Pass mongoose instance to mongoose-sequence

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true } ,
  
  
});

userSchema.plugin(AutoIncrement, { inc_field: 'AdminId' });

const User = mongoose.model('Admin', userSchema); // Use userSchema here instead of bookSchema

module.exports = User;
