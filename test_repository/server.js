const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
var queries = require('./routes/api/queries');
const app = express();
// Body Parser Middleware
app.use(express.json());

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
app.get('/sayHello', (req, res) => {
  res.send('Hello');
});

// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));

let handleDelete = (req, res) => res.send('Deleted');
