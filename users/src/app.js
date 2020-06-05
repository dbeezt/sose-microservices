const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require('express');
const app = express();
const UserController = require('./controller/user');

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
    res.json({ msg: 'testing users' });
});

app.get('/users', UserController.ListAllUsers);
app.get('/user/:username', UserController.ListOneUser);

app.get('/login', UserController.LoadLoginPage);
app.get('/register', UserController.LoadRegisterPage);

app.post('/login', UserController.Login);
app.post('/register', UserController.Register);

app.get('/logout', UserController.Logout);
app.post('/logout', UserController.Logout);

module.exports = app;
