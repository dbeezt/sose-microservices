const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Review = require('./model/review');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'reviews' });
});

app.get('/reviews', async (req, res) => {
    const reviews = await Review.find({
        // find own by ID? all? etc...
    })
    res.json(reviews);
});

app.post('/reviews', async (req, res) => {
    const review = new Review({
        name: req.body.name
    });
    await review.save();
    res.json(review);
});

module.exports = app;
