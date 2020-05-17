const mongoose = require('mongoose');
const uuid = require('node-uuid');

const user = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    username: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('user', user)