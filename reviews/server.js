const mongoose = require('mongoose');
const app = require('./src/app');

if (process.env.MONGO_DB_URI){
    dbConn = process.env.MONGO_DB_URI;
} else {
    dbConn = 'mongodb://review-mongodb:27333'
}

mongoose.connect(dbConn, { useNewUrlParser: true, 
                           autoIndex: false,
                           useFindAndModify: false,
                           useUnifiedTopology: true })
.then(() => { 
    console.log("Review DB Connection SUCCESSFUL");
}).catch((err) => {
    console.log("Review DB Connection ERROR: ", err);
});


app.listen(3000, () => {
    console.log('reviews listening to 3000')
})