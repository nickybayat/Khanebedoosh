import User from './user';
import Bank from './bank';
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

            // Individuals.setBalance(this, balance); // set in DB
        }
        return status;
    }

    async decreaseBalance() {
        this.balance = this.balance - 1000;
        // Individuals.setBalance(this, balance); // set in DB
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

module.exports = Individual;