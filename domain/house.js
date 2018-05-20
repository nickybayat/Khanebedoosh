const HouseModel = require('../models').House;

class House {
    constructor(id, buildingType, address, imageURL, phone,
                description, expireTime, area, basePrice, rentPrice, sellPrice, dealType) {
        this._id = id;
        this._buildingType = buildingType;
        this._address = address;
        this._imageURL = imageURL;
        this._phone = phone;
        this._description = description;
        this._expireTime = expireTime;
        this._area = area;
        this._basePrice = basePrice;
        this._rentPrice = rentPrice;
        this._sellPrice = sellPrice;
        this._dealType = dealType;
    }
}

// const functions = {
//     async createHouse () {
//         const user = await House.create({username: 'ali', email: 'a@b.c', password: '123'});
//         console.log(user);
//         return user;
//     },
//     async getAllUsers () {
//         const users = await User.findAll({});
//         return users;
//     }
// };

module.exports = House;