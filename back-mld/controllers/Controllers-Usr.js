// controllers/Controllers-Usr.js
const Auth = require('../models/model-aut');
const User=require('../models/models-Usr')
const nodemailer = require('nodemailer');
const validator = require('validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const AustUser = async (email, verificationToken) => {
    if (!email) {
        console.error('No email provided for sending verification');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const mailOptions = {
        from: `"DirYdik" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Account Confirmation',
        text: `Click the following link to verify your email: ${process.env.BASE_URL}/verify/${verificationToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};

const verfiTo = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ message: 'Verification token is missing.' });
    }

    console.log(`Verifying token: ${token}`); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);  

        const user = await Auth.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: 'User is already verified.' });
        }

        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: 'Verification successful!' });

    } catch (err) {
        console.error('Verification error:', err);

        // Specific error message for expired tokens
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Verification link has expired. Please request a new one.' });
        }

        return res.status(400).json({ message: 'Invalid verification token.' });
    }
};



 

const CreateUser = async (req, res) => {
    const { email } = req.body;

    if ( !email ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = new Auth({email, isVerified: false });
        await user.save();

        const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await AustUser(user.email, verificationToken);

        res.status(201).json({
            message: 'User created successfully, please check your email for verification link.'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const loginUser = async (req, res) => {
    const { email } = req.body;

    if (!email ) {
        return res.status(400).json({ error: 'Emailare required' });
    }

    try {
        const user = await Auth.findOne({ email });

        // If no user found, return an error
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // If the user is not verified, return an error
        if (!user.isVerified) {
            return res.status(400).json({ error: 'Please verify your email first' });
        }
        // Generate a JWT token after successful login
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });

        res.status(200).json({ message: 'Login successful', token , userInfo: { id: user.userId } ,email });
        
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const createU=async(req,res)=>{
    try {
    const { email, firstname, lastname, phone, userId } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        status: 'exists',
        message: 'User already exists',
        user: existingUser,
      });
    }

    const newUser = new User({
      email,
      firstname,
      lastname,
      phone,
      userId,
    });

    await newUser.save();

    res.status(201).json({ status: 'success', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const getU=async(req,res)=>{
    try{
        const user = await User.find({});
    res.json(user);

} catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
}

}

const getAUTH = async (req, res) => {
    try {
        const users = await Auth.find({});
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAUTH,CreateUser, AustUser, verfiTo, loginUser , createU ,getU};
