const asyncMiddleware = require('../utils/asyncMiddleware');
const individual = require('../domain/manager').individual;

exports.userAPI = asyncMiddleware(async (req, res, next) => {
    let username = req.query.username;
    let houseID = req.query.houseID;
    if (username !== undefined) {
        let result = {'individual': individual.toJSON()};
        if (houseID !== undefined) {
            result['hasPayed'] = await individual.isPhoneNumBought(houseID);
        }
        res.status(200).json(result);
    } else throw Error('No username provided');
});

exports.balanceAPI = asyncMiddleware(async (req, res, next) => {
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