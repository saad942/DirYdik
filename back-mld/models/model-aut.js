const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

// Define the user schema
const userSchema = new mongoose.Schema({
 
    email: { type: String, required: true, unique: true },
    isVerified: {
        type: Boolean,
        default: false, 
      },
    
});

// Apply the AutoIncrement plugin to auto-increment the 'userId' field
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const Auth = mongoose.model('Auth', userSchema);

module.exports = Auth;
