const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const contatSchema = new mongoose.Schema({
    about: { type: String, required: true },
    name: { type: String, required: true}, 
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

contatSchema.plugin(AutoIncrement, { inc_field: 'contactId' });

const User = mongoose.model('Contact', contatSchema); 

module.exports = User;
