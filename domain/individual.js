import User from './user';
class Individual extends User{
    constructor(name, phone, balance, username, password, isAdmin) {
        super(name, isAdmin);
        this._phone = phone;
        this._balance = balance;
        this._username = username;
        this._password = password;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get balance() {
        return this._balance;
    }

}