const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const ReviewSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4()},
    author: String,
    rating: { type: Number, required: false, min: 0.0, max: 10.0 },
    postDate: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Review', ReviewSchema)