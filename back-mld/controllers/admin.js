const express = require('express');
const Book = require('../models/models-Book');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/model-aut');
const Auth = require('../models/model-aut');
const Users = require('../models/models-Usr');
const nodemailer = require('nodemailer');


const app = express();
app.use(express.json());

const countUser = async (req, res) => {
    try {
        const userCount = await Auth.countDocuments();
        res.json({ count: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const count = async (req, res) => {
    try {
        const CountA = await Book.countDocuments({ status: 'active' });

        const CountP = await Book.countDocuments({ status: 'pending' });
        res.json({ count_active: CountA, count_pending: CountP });  

    } catch (error) {
        console.error('Error fetching book count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const avtiveBook = async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.Id });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Toggle status
    const newStatus = book.status === 'active' ? 'pending' : 'active';

    // Update booking status
    const updatedBook = await Book.findOneAndUpdate(
      { bookId: req.params.Id },
      { status: newStatus },
      { new: true }
    );
    const gmailS = await Auth.findOne({ userId: book.userId });
    // Prepare email details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"DirYdik" <${process.env.EMAIL}>`,
      to: gmailS.email, // assuming 'email' is a field in your Book model
      subject: '✅ Your Appointment is Confirmed!',
      text: `Thank you for booking with us! Your appointment has been successfully confirmed.

Here are the details:

Date: ${book.date}
Time: ${book.time}
Location: Casablanca
Service: ${book.service}

If you need to reschedule or have any questions, feel free to contact us at support@dirydik.com.

We look forward to seeing you!

Best regards,
DirYdik Team`,
    };
    await res.json(updatedBook);
    // Send email
    await transporter.sendMail(mailOptions);

    

  } catch (error) {
    console.error('Error updating book status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};







const getBook = async (req, res) => {
    const userId = req.params.userId; 
    try {
        const book = await Book.find({ userId : userId });
        
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getUserid = async (req, res) => {
    try {
        const id = Number(req.params.userId); // Convert to number if needed
        const user = await User.findOne({ userId: id });

        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const deletedProduct = await User.findOneAndDelete({ userId: id });
        const deletedBookings = await Book.deleteMany({ userId: id });

        if (deletedProduct && deletedBookings) {
            res.send('user deleted successfully');
        } else {
            res.status(404).send('user not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};
const deletedAppoinment = async (req, res) => {
    try {
        const id = req.params.bookId;
        const deletedAppointment = await Book.findOneAndDelete({ bookId: id });

        if (deletedAppointment) {
            res.status(200).send('book deleted successfully');
        } else {
            res.status(404).send('Booking not found');
        }
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).send('Error deleting appointment');
    }
};


const updateAppoinment = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const { booking, user } = req.body || {};

    // Defensive check before deleting _id
    if (booking && booking._id) delete booking._id;
    if (user && user._id) delete user._id;

    if (!booking || !user) {
      return res.status(400).send("Missing booking or user data in request body");
    }

    const updatedBooking = await Book.findOneAndUpdate(
      { bookId },
      { $set: booking },
      { new: true }
    );

    const updatedUser = await Users.findOneAndUpdate(
      { userId },
      { $set: user },
      { new: true }
    );

    if (updatedBooking && updatedUser) {
      res.status(200).json({ booking: updatedBooking, user: updatedUser });
    } else {
      res.status(404).send("Booking or user not found");
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).send("Error updating appointment");
  }
};




const getAllBook = async (req, res) => {
    try {
        const book = await Book.find({});
        
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getBook, getUser ,deleteUser ,getAllBook ,countUser , avtiveBook , count , deletedAppoinment ,getUserid , updateAppoinment};
