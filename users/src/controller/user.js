const mongoose = require("mongoose");
const User = require("../model/user");
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

exports.AuthUser = (req, res, next) => {
    console.log("test func");
};

exports.ListAllUsers = (req, res, next) => {
    User.find({})
        .then(users => {
            if(users.length == 0){
                console.log("no users found");
            }else{
                console.log(users);
            };
            res.status(200).json({users});
        });
};

exports.ListOneUser = (req, res) => {
    var path = req.path.split("/");
    username = path[2];
    User.findOne({ username: username })
        .then(user => {
            if(user){
                console.log("Found " + user.username);
                res.status(200).json({});
            }else{
                console.log("User '" + user.username + "' doesn't exist");
                res.status(500).json({});
            };    
        });
};

exports.Login = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
    .exec()
    .then(user => {
        if(user){
            if(user.password == req.body.password){
                res.cookie('user', user.username);
                res.cookie('guest', false);
                res.redirect('http://localhost:8080/dashboard');
            }else{
                res.cookie('user', 'Guest');
                res.cookie('guest', true);
                res.redirect('http://localhost:8080/login');
            }
        }else{
            res.cookie('user', 'Guest');
            res.cookie('guest', true);
            res.redirect('http://localhost:8080/login');
        }
    })
}

exports.LoadLoginPage = (req, res, next) => {
    const userInSession = req.cookies['user'];
    res.render('login', {user: userInSession,});
};

exports.Logout = (req, res, next) => {
    res.cookie('user', 'Guest');
    res.cookie('guest', true);
    res.redirect('http://localhost:8080/login');
}

exports.Register = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if(user.length >= 1){
                // res.render('http://localhost:3000/login',
                // {user});
                res.status(200).json({
                    message: "Username already exists"
                });
            }else{
                const user = new User ({
                    _id: uuidv4(),
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                });
                user.save()
            .then(user => {
                res.cookie('user', user.username);
                res.cookie('guest', false);
                res.redirect('http://localhost:8080/dashboard');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        };
    });
};

exports.LoadRegisterPage = (req, res, next) => {
    res.render('register');
}