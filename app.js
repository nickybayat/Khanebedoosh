const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const asyncMiddleware = require('./utils/asyncMiddleware');
const users = require('./routes/user');
const houses = require('./routes/house');
const port = process.env.port || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(function (req, res, next) {
    console.log({
        request: {
            url: req.originalUrl,
            method: req.method,
            body: req.body
        }
    });
    next();
});

app.use('/public', express.static(__dirname + '/statics'));

app.get('/', function (req, res) {
    res.send('Welcome to KhaneBeDoosh');
});

app.post('/balance', users.balanceAPI);


app.post('/houses', houses.addHouseAPI);

app.get('/houses/:houseID/phone', houses.phoneAPI);

app.get('/users', users.userAPI);

app.get('/houses', houses.searchAPI);

app.use(function (error, req, res, next) {
    console.error(error);
    res.status(400).json({'msg': 'an error occurred! ' + error.message})
});

app.listen(port);
console.log('Listening on port: ' + port);