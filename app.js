const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const asyncMiddleware = require('./utils/asyncMiddleware');
const Individual = require('./domain/individual');

const individual = new Individual("بهنام همایون", "021123456", 0, 'behnamhomayoon', 'password', false);

const port = process.env.port || 8080;

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

app.post('/balance', asyncMiddleware(async (req, res, next) => {
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
}));

// app.get('/houses/:houseID/phone', function (req, res) {
//     if (individual.balance >= 1000 && !individual.isPhoneNumBought(req.params.houseID)) {
//         individual.addBoughtHouseID(req.params.houseID);
//
//     }
// });

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).json({message: 'an error occurred!'})
});


app.listen(port);
console.log('Listening on port: ' + port);