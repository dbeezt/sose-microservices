const mongoose = require('mongoose')
const uuid = require('node-uuid');

const review = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    authorID: String,
    authorUsername: String,
    authorEmail: String,
    rating: String,
    postDate: { type: Date, default: Date.now},
});

module.exports = mongoose.model('review', review)