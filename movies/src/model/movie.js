const mongoose = require('mongoose')
const uuid = require('node-uuid');
const genres = ['action', 'adventure', 'animated', 'comedy', 'crime', 'drama', 'fantasy', 'historical', 'horror', 'mystery', 'romance', 'science fiction', 'thriller', 'western']

const movie = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    title: String,
    enum: genres,
    year: { type: Number, min: 1874, max: new Date().getFullYear() },
    rating: { type: Number, required: false, min: 0.0, max: 10.0 },
});

module.exports = mongoose.model('movie', movie)