const mongoose = require('mongoose');
const app = require('./src/app');

if (process.env.MONGO_DB_URI){
    dbConn = process.env.MONGO_DB_URI;
} else {
    dbConn = 'mongodb://movies-mongodb:27222'
}

//TO-DO: Enable auth. with user/psw
mongoose.connect(dbConn, { useNewUrlParser: true, 
                           autoIndex: false,
                           useFindAndModify: false,
                           useUnifiedTopology: true })
.then(() => { 
    console.log("Movie DB Connection SUCCESSFUL");
}).catch((err) => {
    console.log("Movie DB Connection ERROR: ", err);
});


app.listen(3000, () => {
    console.log('movies listening to 3000')
})