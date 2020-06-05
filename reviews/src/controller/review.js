const mongoose = require("mongoose");
const Review = require("../model/review");
const { v4: uuidv4 } = require('uuid');
const request = require('request');

exports.ListAllReviewsForMovie = (req, res, next) => {
    var path = req.path.split("/");
    movieTitle = path[2];
    Review.find({ movieTitle: movieTitle})
    .then(reviews => {
        if(reviews.length == 0){
            res.status(404).json({message: "No reviews found"});
        }else{
            res.status(200).json({message: reviews});
        };
    });
};

exports.ListSingleReview = (req, res) => {
    var path = req.path.split("/");
    id = path[2];
    console.log(id);
    Review.findOne({ _id: id })
    .then(review => {
        if(review){
            res.status(200).json({message: review});
        }else{
            res.status(500).json({message: "review '" + id + "' doesn't exist"});
        };    
    });
};


exports.AddReview = (req, res, next) => {
    const author = req.session.user || req.body.author || "unknown"
     Review.find({ movie: req.body.title, author: author})
        .exec()
        .then(review => {
            if(review.length >= 1){
                res.status(200).json({
                    message: req.body.author + " has already submitted a review for " + req.body.title
                });
            }else{
                const review = new Review({
                    _id: uuidv4(),
                    movie: req.body.title,
                    author: req.body.author,
                    content: req.body.content,
                    rating: req.body.rating
                });
            review.save()      
            .then(review => {
                console.log(review);
                request.post({
                    headers: {'content-type': 'application/json'},
                    url: 'http://127.0.0.1:8080/movies/update/' +  review.movie,
                    form: {
                        "reviews": review
                    }
                });
            })    
            .then(review => {
                console.log(review);
                res.status(201).json({
                    message: "Created review of " + req.body.title + " from author " + req.body.author
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

exports.UpdateReview = (req, res, next) => {
    var updateOperations = {};
    for(const key of Object.keys(req.body)){
        updateOperations[key] = req.body[key];
    }

    var path = req.path.split("/");
    id = path[2];
    console.log(updateOperations);

     Review.findOneAndUpdate({ _id: id }, { $set: updateOperations })
    .exec()
    .then(review => {
        console.log(review);
        res.status(202).json({
            message: "Updated " +  review.id
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});
}

exports.DeleteReview = (req, res, next) => {
    var path = req.path.split("/");
    id = path[2];

    Review.deleteOne({ _id: id })
    .exec()
    .then(review => {
        if(review){
            res.status(202).json({message: "Deleted review" + id});
        }else{
            res.status(500).json({message: "review '" + id + "' doesn't exist"});
        };    
    });
}