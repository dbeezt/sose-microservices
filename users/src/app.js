const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('./model/user');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'users' });
});

module.exports = app;
