const HouseModel = require('../models').house;
const House = require('../domain/house');
const debug = require('debug')('dataHouse')
    , name = 'KhaneBeDoosh';

exports.addHouse = (house) => {
    debug(house);
    HouseModel.create({
        area: house.area, basePrice: house.basePrice, rentPrice: house.rentPrice,
        sellPrice: house.sellPrice, dealType: house.dealType, expireTime: house.expireTime,
        id: house.id, buildingType: house.buildingType, address: house.address,
        imageURL: house.imageURL, phone: house.phone, description: house.description
    });
};

exports.doesHouseExist = (id) => {
    let result = HouseModel.find({where: {id: id}})
        .then(function (house) {
            if (house)
                return true;
            else
                return false
        })
        .catch(function (error) {
            console.log("could not find the house" + error.message);
        })
    return result;
}

exports.getHouse = async (id) => {
    let result = await HouseModel.find({where: {id: id}});
    debug(JSON.stringify(result));
    if (result != null)
        return new House(result.id, result.buildingType, result.address, result.imageURL, result.phone,
            result.description, result.expireTime, result.area, result.basePrice, result.rentPrice, result.sellPrice,
            result.dealType);
    else return null;
};
