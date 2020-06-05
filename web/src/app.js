const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

const userService = 'http://localhost:8080/users'
const movieService = 'http://localhost:8080/movies'
const reviewService = 'http://localhost:8080/reviews'

// const userRoute = require('LINK_TO_USER_MICROSERVICE');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json);
// app.use(morgan('dev'));

app.use(cookieParser());
app.use(cookieSession(
    {name: 'session',
     keys: ['user', 'guest']}
));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public'));
app.use(express.static(__dirname + '/www'));
app.use('/res', express.static(__dirname + '../resources'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    };
    next();
});

app.get('/login', (req, res) => {
    if(req.cookies['users'] && req.cookies['guest'] == false){
        res.render('dashboard', {user: req.cookies['user']});
    }else{
        res.render('users/login');
    }
});

app.get('/register', (req, res) => {
    res.render('users/register');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {user: req.cookies['user'], guest: req.cookies.guest});
});

app.get('/movies', (req, res) => {
    res.render('movies', {movies: movies})
});

app.get('/', (req, res) => { 
    res.render('index', {
        user: req.user | "test"
    });
});

module.exports = app;