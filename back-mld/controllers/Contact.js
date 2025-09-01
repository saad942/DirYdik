const ContactModel = require('../models/models-Contact'); 
const nodemailer = require('nodemailer');
const validator = require('validator');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

const Contact = async (req, res) => {
    const { about, name, email, phone, message } = req.body;

    if (!about || !name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }


        const contact = new ContactModel({ about, name, email, phone, message });
        await contact.save();

        const mailOptions = {
            from: email,  
            to: process.env.EMAIL,  
            subject: `Message regarding: ${about}`,  
            text: `You have a new message from ${name} (${email}).
    
    Phone: ${phone}
    
    Message:
    ${message}`  
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent');
            res.status(201).json({ status: 'success', user: { name, email, phone } });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            res.status(500).json({ error: 'Error sending email' });
        }
   
};

module.exports = { Contact };
