const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Review = require('./model/review');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'reviews' });
});

module.exports = app;
