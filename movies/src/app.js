const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require('express');
const path = require('path');
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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.use('/res', express.static(__dirname + '../resources'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    };
    next();
});

app.get('/', MovieController.ListAllMovies);
app.get('/search', MovieController.LoadSearchPage);
app.post('/search', MovieController.ListOneMovie);
app.post('/movie', MovieController.AddMovie);
app.post('/update/:title', MovieController.UpdateMovie);
app.post('/delete/:title', MovieController.DeleteMovie);

module.exports = app;
