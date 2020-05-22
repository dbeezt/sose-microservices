const mongoose = require("mongoose");
const Movie = require("../model/movie");
const { v4: uuidv4 } = require('uuid');

exports.ListAllMovies = (req, res, next) => {
    Movie.find({})
        .then(movies => {
            if(movies.length == 0){
                res.status(404).json({message: "No movies found"});
            }else{
                res.status(200).json({message: movies});
            };
        });
};

exports.ListOneMovie = (req, res) => {
    var path = req.path.split("/");
    title = path[2];
    Movie.findOne({ title: title })
        .then(movie => {
            if(movie){
                res.status(200).json({message: "Found " + {movie}});
            }else{
                res.status(500).json({message: "Movie '" + movie.title + "' doesn't exist"});
            };    
        });
};


exports.AddMovie = (req, res, next) => {
    Movie.find({ title: req.body.title, year: req.body.year })
        .exec()
        .then(movie => {
            if(movie.length >= 1){
                // res.render('http://localhost:3000/movies',
                // {movie});
                res.status(200).json({
                    message: "Movie already exists"
                });
            }else{
                const movie = new Movie ({
                    _id: uuidv4(),
                    title: req.body.title,
                    genre: req.body.genre,
                    year: req.body.year,
                    rating: req.body.rating
                });
                movie.save()
                
            .then(result => {
                // res.redirect('http://localhost:3000');
                res.status(201).json({
                    message: "Created Movie " + movie.title
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

exports.UpdateMovie = (req, res, next) => {
    var updateOperations = {};
    for(const key of Object.keys(req.body)){
        updateOperations[key] = req.body[key];
    }

    var path = req.path.split("/");
    title = path[3];
    console.log(title);
    Movie.findOneAndUpdate({ title: title }, { $set: updateOperations})
    .exec()
    .then(result => {
        //res.redirect("/movies")
        res.status(202).json({
            message: "Updated " + movie.title
            })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});
}

exports.DeleteMovie = (req, res, next) => {
    var path = req.path.split("/");
    title = path[3];
    Movie.deleteOne({ title: title })
        .exec()
        .then(movie => {
            if(movie){
                res.status(203).json({message: "Deleted " + {movie}});
            }else{
                res.status(500).json({message: "Movie '" + movie.title + "' doesn't exist"});
            };    
        });
}