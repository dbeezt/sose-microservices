const mongoose = require("mongoose");
const Movie = require("../model/movie");
const { v4: uuidv4 } = require('uuid');

exports.LoadMoviesPage = (req, res, next, movies) => {
    res.render('movies', {movies: movies});
};

exports.ListAllMovies = (req, res, next) => {
    Movie.find({})
        .then(movies => {
            this.LoadMoviesPage(req, res, next, movies);
        });
};

exports.LoadMoviePage = (req, res, next, movie) => {
    console.log(movie);
    res.render('movie', {movie: movie});
};

exports.PullReviewsForMovie = (req, res) => {
    reviewsUrl = 'http://localhost:8080/reviews';
};

exports.ListOneMovie = (req, res) => {
    title = req.body.title;
    Movie.findOne({ title: title })
        .then(movie => {
            //cool idea but looks dumb on words like 'of' e.g. Ghosts Of Mars
            //movie.title = CapitaliseFirstLettersOfWords(movie.title);
            if(movie){
                console.log(movie);
                res.render('movie', {movie: movie});
            }else{
                res.render('movie', {movie: "No Movie Found"});
            };    
        });
};

exports.LoadSearchPage = (req, res, next) => {
    res.render('search');
}

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
                    genre: req.body.genre.toLowerCase(),
                    year: req.body.year,
                    rating: req.body.rating
                });
                movie.save()
                
            .then(result => {
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
    console.log(updateOperations);

    var path = req.path.split("/");
    title = path[2];

    Movie.findOneAndUpdate({ title: title }, { $set: updateOperations})
    .exec()
    .then(movie => {
        console.log(movie);
        res.render('movie', {movie: movie});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.DeleteMovie = (req, res, next) => {
    var path = req.path.split("/");
    title = path[3];
    Movie.deleteOne({ title: title })
        .exec()
        .then(movie => {
            if(movie){
                res.status(202).json({message: "Deleted " + {movie}});
            }else{
                res.status(500).json({message: "Movie '" + movie.title + "' doesn't exist"});
            };    
        });
}

function CapitaliseFirstLettersOfWords(string) {
    var split = string.toLowerCase().split(' ');
    for (var i = 0; i < split.length; i++) {
        split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);     
    }
    return split.join(' '); 
 }