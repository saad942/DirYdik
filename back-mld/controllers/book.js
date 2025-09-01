const express = require('express');
const Book = require('../models/models-Book');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  

// Endpoint to create a booking
const CreateBook = async (req, res) => {
    try {
        const { zip, cleaningType, address, extra, date, houre, room, prix, userId } = req.body;

        // Check for missing fields
        if (!zip || !prix || !cleaningType || !address || !extra || !date || !houre || !room || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new booking object and associate it with the userId
        const book = new Book({
            zip,
            cleaningType,
            address,
            extra,
            date,
            houre,
            prix,
            room,
            userId // The userId is coming from the frontend request
        });

        await book.save();
        
        return res.status(201).json({
            message: 'success',
            book: book
        });

    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};





const getBookById = async (req, res) => {
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



module.exports = { CreateBook ,getBookById   };

