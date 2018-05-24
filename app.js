const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const asyncMiddleware = require('./utils/asyncMiddleware');
const Search = require('./domain/search');
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
    res.send('Welcome to Khanebedoosh');
});

app.post('/balance', users.balanceAPI);

app.get('/houses', asyncMiddleware(async (req, res, next) => {
    let minArea = req.query.minArea;
    let buildingType = req.query.buildingType;
    let dealType = req.query.dealType;
    let maxPrice = req.query.maxPrice;
    try {
        let searchHouses = new Search(minArea, buildingType, dealType, maxPrice);
        let requestedHouses = searchHouses.getRequestedHousesFromAllUsers(searchHouses);
        // requestedHouses must be a json array
        let result = {'houses': requestedHouses};
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({'msg': "Error in finding houses! Try Again! " + error.message});
    }
}));

app.get('/houses/:houseID/phone', houses.phoneAPI);

app.get('/users', users.userAPI);

app.use(function (error, req, res, next) {
    console.error(error);
    res.status(400).json({'msg': 'an error occurred! ' + error.message})
});

app.listen(port);
console.log('Listening on port: ' + port);