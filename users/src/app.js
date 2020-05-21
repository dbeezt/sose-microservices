const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('./model/user');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ msg: 'users' });
});

app.get('/users', async (req, res) => {
    const users = await User.find({
        // find own by ID? all? etc...
    })
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name
    });
    await user.save();
    res.json(user);
});

module.exports = app;
