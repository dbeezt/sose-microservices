const mongoose = require('mongoose');
const app = require('./src/app');
const port = 3000

if (process.env.MONGO_DB_URI){
    dbConn = process.env.MONGO_DB_URI;
} else {
    dbConn = 'mongodb://localhost:27017/sose-movies'
}

mongoose.connect(dbConn);

app.listen(port, () => {
    console.log('reviews port active')
})