const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const review = new mongoose.Schema({
    _id: { type: String, default: uuidv4()},
    authorID: String,
    authorUsername: String,
    authorEmail: String,
    rating: String,
    postDate: { type: Date, default: Date.now},
});

module.exports = mongoose.model('review', review)