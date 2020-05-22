const mongoose = require("mongoose");
const User = require("../model/user");
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
            res.status(200).json({});
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
        if(user.password == req.body.password){
            console.log("real psw: " + user.password + " / body: " + req.body.password);
            req.session.user = user.username;
            // res.redirect('http://localhost:3000/login');
            res.status(200).json({
                message: "Logged in as " + user.username
            });
        }else{
            req.session.destroy(() => {
                console.log("SESSION DESTROYED");
            })
            res.status(500).json({
                message: user.username + " doesn't exist or password was incorrect"
            });
            // res.render('http://localhost:3000/login', 
            //            {username: req.body.username});
        }
    })
}

exports.LoadLoginPage = (req, res, next) => {
    const response = {
        session: req.session.user
    };
    req.session.destroy(() => {

    });
    res.render('login', {response});
};

exports.Logout = (req, res, next) => {
    req.session.destroy(() => {});
    res.redirect('http://localhost:3000/login');
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
                
            .then(result => {
                req.session.user = user.username;
                console.log("SESSION: " + req.session.user);
                // res.redirect('http://localhost:3000');
                res.status(201).json({
                    message: "Created User " + user.username
                });
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
    if(req.session.user != null){
        req.session.destroy(() => {});
    }
    res.render('register');
}