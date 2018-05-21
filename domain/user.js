class User {
    constructor(name, isAdmin) {
        this._name = name;
        this._isAdmin = isAdmin;
    }

    get name() {
        return this._name
    }

    get isAdmin() {
        return this._isAdmin
    }
}

module.exports = User;