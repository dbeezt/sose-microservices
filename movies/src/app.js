const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require('express');
const app = express();
const MovieController = require('./controller/movie');

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
app.use(cookieSession(
    {name: 'session',
     keys: ['user', 'guest']}
));

app.get('/', (req, res) => {
    res.json({ msg: 'movies' });
});

app.get('/movies', MovieController.ListAllMovies);
app.get('/movie/:title', MovieController.ListOneMovie);
app.post('/movie/add', MovieController.AddMovie);
app.post('/movie/update/:title', MovieController.UpdateMovie);
app.post('/movie/delete/:title', MovieController.DeleteMovie);

module.exports = app;
