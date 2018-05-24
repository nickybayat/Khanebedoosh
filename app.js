const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const asyncMiddleware = require('./utils/asyncMiddleware');
const Individual = require('./domain/individual');
const Search =require('./domain/search');
const individual = new Individual("بهنام همایون","021123456",0,'behnamhomayoon','password',false);

const port = process.env.port || 8080;
const debug = require('debug')('http')
    , http = require('http')
    , name = 'KhaneBeDoosh';


let count = 0;

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

// app.use('/name', function(req, res, next) {
//     //Surely it's not a good way to count api calls like this. It's just to show how middleware works.
//     count++;
//     console.log('url ' + req.originalUrl + ' called ' + count + ' times');
//     next();
// });

app.use('/public', express.static(__dirname + '/statics'));

app.get('/', function (req,res) {
    res.send('Welcome to Khanebedoosh');
})

app.post('/balance', function(req, res) {
    let value = req.body.balance;
    try {
        let status = await individual.increaseBalance(parseInt(value));
        if (status === true) {
            res.status(200).json({'msg': 'increased balance by ' + value + ' successfully!'});
        }
        else {
            res.status(500).json({'msg': 'failed to increase balance by ' + value + '! bank server error!'});
        }
    } catch (error) {
        console.log("Error in increasing balance " + error.message);
        res.status(400).json({'msg': 'error in increasing balance! try again!'});
    }
});

app.get('/houses',function (req,res) {
    let minArea = req.query.minArea;
    let buildingType = req.query.buildingType;
    let dealType = req.query.dealType;
    let maxPrice = req.query.maxPrice;
    try{
        var searchHouses = new Search(minArea,buildingType,dealType,maxPrice);
        let requestedHouses = searchHouses.getRequestedHousesFromAllUsers(searchHouses);
        // requestedHouses must be a json array
        var result = {'houses' : requestedHouses};
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({'msg': "Error in finding houses! Try Again!"});
    }
})

app.get('/houses/:houseID/phone', asyncMiddleware (async (req, res, next) => {
    debug('purchasing phone number for id ' + req.params.houseID + '... current balance is ' + individual.balance);
    let isBought = await individual.isPhoneNumBought(req.params.houseID);
    debug('value is ' + isBought);
    if (individual.balance >= 1000 && !isBought) {
        debug('balance is more than 1000');
        await individual.addBoughtHouseID(req.params.houseID);
        await individual.decreaseBalance();
        res.status(200).json({'purchaseSuccessStatus':'true'});
    }
    else if(individual.balance < 1000 && !isBought){
        res.status(200).json({'purchaseSuccessStatus':'false'});
    }
    else if(isBought){
        res.status(200).json({'purchaseSuccessStatus':'true'});
        debug('phone number is already bought');
    }
    else throw Error('failed to purchase phone number!');
}));

app.use(function(error, req, res, next) {
    console.error(error);
    res.status(400).json({'msg': 'an error occurred! '+ error.message})
});




app.listen(port);
console.log('Listening on port: ' + port);