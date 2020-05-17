const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Movie = require('./model/movie');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'movies' });
});

module.exports = app;
