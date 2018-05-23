const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.port || 8080;
let count = 0;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
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

app.post('', function(req, res) {
    const allNames = [{
        firstName: 'Ali',
        lastName: 'Alavi',
    },
        {
            firstName: 'Hassan',
            lastName: 'Hassani',
        },
        {
            firstName: 'Hossein',
            lastName: 'Hosseini',
        }];
    res.render('./allNames', {allNames});
});



app.listen(port);
console.log('Listening on port: ' + port);