const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Movie = require('./model/movie');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'movies' });
});

app.get('/movies', async (req, res) => {
    const movies = await Review.find({
        // find own by ID? all? etc...
    })
    res.json(movies);
});

app.post('/movies', async (req, res) => {
    const movie = new Movie({
        name: req.body.name
    });
    await review.save();
    res.json(review);
});

module.exports = app;
