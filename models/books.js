const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let booksSchema = new Schema({
    Name: String,
    Author: String,
    phone: String,
    ISBN: String,
    Price: Number
});

module.exports = mongoose.model('books', booksSchema)