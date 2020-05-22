const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const ReviewController = require('./controller/review');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === "OPTIONS"){
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
      return res.status(200).json({});
  };
  next();
});

app.use(cookieParser());
app.use(session(
    {'secret': 'test',
     'saveUninitialized': true,
     'resave': true}
));

app.get('/', (req, res) => {
    res.json({ msg: 'reviews' });
});

app.get('/movie/:title/reviews', ReviewController.ListAllReviewsForMovie);
app.get('/movie/:title/review/:id', ReviewController.ListOneReview);
app.post('/movie/:title/review', ReviewController.AddReview);
app.post('/movie/:title/review/update/:id', ReviewController.UpdateReview);
app.post('/movie/:title/review/delete/:id', ReviewController.DeleteReview);

module.exports = app;