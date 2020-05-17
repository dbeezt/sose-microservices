const app = require('./src/app');
const port = 3000

app.listen(port, () => {
    console.log('web app running on port ' + port)
});