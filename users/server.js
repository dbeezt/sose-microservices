const mongoose = require('mongoose')
const app = require('./src/app');
const port = 3000;

if (process.env.MONGO_DB_URI){
    dbConn = process.env.MONGO_DB_URI;
} else {
    dbConn = 'mongodb://user-mongodb:27111'
}

//TO-DO: Enable auth. with user/psw
mongoose.connect(dbConn, { useNewUrlParser: true, 
                           autoIndex: false,
                           useFindAndModify: false,
                           useUnifiedTopology: true })
.then(() => { 
    console.log("User DB Connection SUCCESSFUL");
}).catch((err) => {
    console.log("User DB Connection ERROR: ", err);
});


app.listen(port, () => {
    console.log('user service listening to ' + port)
});
