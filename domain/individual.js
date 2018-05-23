const User = require ('./user');
const Bank = require('./bank');
const individual = require('../models').individual;
// import HouseIDs from '../data/HouseIDs';

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
        if(status){
            this.balance = this.balance + value;
            let newBalance = this.balance;
            // console.log("balance: "+ newBalance);
            individual.find({ where: { username: this.username } })
                .then(function (individual) {
                    // Check if record exists in db
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
        // Individuals.setBalance(this, balance); // set in DB
        individual.find({where: {username: this.username}})
            .then(function(individual){
                individual.updateAttributes({
                    balance: newBalance
                })
            })
    }

    async getBoughtHouseIDs() {
        // return HouseIDs.getHouseIDs(this.username); // get HouseIDs from DB
    }

    async addBoughtHouseID(id) {
        // HouseIDs.addHouseID(this.username,id); // add HouseID to DB
    }

    isPhoneNumBought(id){
        let boughtHouseIDs = this.getBoughtHouseIDs();
        let i = 0;
        for (i ; i < boughtHouseIDs.length ; i++) {
            if (boughtHouseIDs[i] === id)
                return true;
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

// module.exports = Individual;

i = new Individual("بهنام","0212222",4000,"behnamhomayoon","password",false);
let promise = i.decreaseBalance();
promise.then(() =>{
    console.log(i.balance);
});