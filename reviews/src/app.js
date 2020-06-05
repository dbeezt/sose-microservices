const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require('express');
const path = require('path');
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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(cookieSession(
    {name: 'session',
     keys: ['user', 'guest']}
));

app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/movies');
});

// app.get('/movie/:movie', ReviewController.ListAllReviewsForMovie);
app.get('/movie/:id', ReviewController.ListSingleReview);
app.post('/movie', ReviewController.AddReview);
app.get('/movie', ReviewController.LoadReviewCreationPage);
app.post('/update/:id', ReviewController.UpdateReview);
app.post('/delete/:id', ReviewController.DeleteReview);

module.exports = app;