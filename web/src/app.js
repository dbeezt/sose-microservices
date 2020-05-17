const express = require("express");
const path = require('path');
const app = express();

app.get('/', (req, res) => { 
    console.log('hello');
})

module.exports = app;