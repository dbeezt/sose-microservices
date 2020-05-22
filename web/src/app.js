const express = require("express");
const session = require("express-session")
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const morgan = require("morgan");
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'public'));

app.get('/', (req, res) => { 
    res.render('index', {
        user: "test"
        // user: req.user
    });
});

module.exports = app;