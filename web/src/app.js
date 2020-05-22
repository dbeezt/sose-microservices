const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const morgan = require("morgan");
const app = express();

// const userRoute = require('LINK_TO_USER_MICROSERVICE');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json);
// app.use(morgan('dev'));

app.use(cookieParser());
app.use(session(
    {'secret': 'test',
     'saveUninitialized': true,
     'resave': true}
));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'public'));
// app.use(express.static(__dirname + '/www'));
app.use('/res', express.static(__dirname + '../resources'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    };
    next();
});

// app.use('/', userRoute);

app.get('/', (req, res) => { 
    res.render('index', {
        user: "test"
        // user: req.user
    });
});

module.exports = app;