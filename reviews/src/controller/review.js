const mongoose = require("mongoose");
const Review = require("../model/review");
const { v4: uuidv4 } = require('uuid');

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

exports.ListOneReview = (req, res) => {
    var path = req.path.split("/");
    movieTitle = path[2];
    author = path[4],
     Review.findOne({ movieTitle: movieTitle, author: author })
        .then(review => {
            if(review){
                res.status(200).json({message: "Found " + {review}});
            }else{
                res.status(500).json({message: "review '" + review.title + "' doesn't exist"});
            };    
        });
};


exports.AddReview = (req, res, next) => {
    author = req.session.user || req.body.author || "unknown"
     Review.find({ title: req.body.title, author: author})
        .exec()
        .then( review => {
            if(review.length >= 1){
                // res.render('http://localhost:3000/ reviews',
                // {review});
                res.status(200).json({
                    message: " review already exists"
                });
            }else{
                const  review = new  review ({
                    _id: uuidv4(),
                    author: author,
                    movieTitle: req.body.title,
                    rating: req.body.rating
                });
                 review.save()
                
            .then(result => {
                // res.redirect('http://localhost:3000');
                res.status(201).json({
                    message: "Created review of " + review.movieTitle + " from author " + review.author
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
    movieTitle = path[2];
     Review.findOneAndUpdate({ title: title }, { $set: updateOperations })
    .exec()
    .then(result => {
        //res.redirect("/ reviews")
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
    title = path[2];
     Review.deleteOne({ title: title })
        .exec()
        .then( review => {
            if( review){
                res.status(203).json({message: "Deleted " + { review}});
            }else{
                res.status(500).json({message: " review '" +  review.title + "' doesn't exist"});
            };    
        });
}