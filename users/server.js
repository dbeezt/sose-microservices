const mongoose = require('mongoose')
const app = require('./src/app');

if (process.env.MONGO_DB_URI){
    dbConn = process.env.MONGO_DB_URI;
} else {
    dbConn = 'mongodb://users-mongodb:27111'
    console.log("bleugh!");
}

// user + pass to be added
console.log(dbConn);
mongoose.connect(dbConn, { useNewUrlParser: true, 
                           autoIndex: false,
                           useFindAndModify: false,
                           useUnifiedTopology: true })
.then(() => { 
    console.log("User DB Connection SUCCESSFUL");
}).catch((err) => {
    console.log("User DB Connection ERROR: ", err);
});

app.listen(3000, () => {
    console.log('users listening to 3000')
});
