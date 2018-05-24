const User = require('./user');
const Bank = require('./bank');
const IndividualModel = require('../models').individual;
const HouseID = require('../models').HouseIDs;
const debug = require('debug')('http')
    , http = require('http')
    , name = 'KhaneBeDoosh';

class Individual extends User {
    constructor(name, phone, balance, username, password, isAdmin) {
        super(name, isAdmin);
        this._phone = phone;
        this._balance = balance;
        this._username = username;
        this._password = password;
    }

    async increaseBalance(value) {
        let status = await Bank.sendPayRequestAndGetResponse(value);
        if (status) {
            this.balance = this.balance + value;
            let newBalance = this.balance;
            IndividualModel.find({where: {username: this.username}})
                .then(function (individual) {
                    if (individual) {
                        individual.updateAttributes({
                            balance: newBalance
                        })
                    }
                })
        }
        return status;
    }

    async decreaseBalance() {
        this.balance = this.balance - 1000;
        let newBalance = this.balance;
        IndividualModel.find({where: {username: this.username}})
            .then(function (individual) {
                individual.updateAttributes({
                    balance: newBalance
                })
            })
    }

    async getBoughtHouseIDs() {
        return HouseID.findAll({where: {individualUsername: this.username}})
            .then(results => {
                let houseIDArray = [];
                results.forEach((row) => {
                    houseIDArray.push(row.houseID);
                });
                return houseIDArray;
            });
    }

    async addBoughtHouseID(id) {
        await HouseID.create({houseID: id, individualUsername: this.username});
    }

    async isPhoneNumBought(id) {
        let boughtHouseIDs = await this.getBoughtHouseIDs();
        let i = 0;
        for (i; i < boughtHouseIDs.length; i++) {
            debug('id ' + boughtHouseIDs[i] + ' is being checked');
            if (boughtHouseIDs[i] === id) {
                debug(id + ' is equal to ' + boughtHouseIDs [i]);
                return true;
            }
        }
        return false;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get phone() {
        return this._phone;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

}

module.exports = Individual;

// i = new Individual("بهنام", "0212222", 4000, "behnamhomayoon", "password", false);
// let promise = i.isPhoneNumBought("thisisd");
// promise.then((res) => {
//     console.log("res is: " + res);
// });