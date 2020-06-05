const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const genres = ['action', 'adventure', 'animated', 'comedy', 'crime', 'drama', 'fantasy', 'historical', 'horror', 'mystery', 'romance', 'science fiction', 'thriller', 'western'];


const MovieSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4() },
    title: String,
    genre: { type: String, enum: genres },
    year: { type: Number, min: 1874, max: new Date().getFullYear() },
    rating: { type: Number, required: false, min: 0.0, max: 10.0 },
    reviews: []
});

module.exports = mongoose.model('Movie', MovieSchema)