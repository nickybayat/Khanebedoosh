const House = require('../models').house;

exports.addHouse = async (house) => {
    try {
        await House.create({
            area: house.area, basePrice: house.basePrice, rentPrice: house.rentPrice,
            sellPrice: house.sellPrice, dealType: house.dealType, expireTime: house.expireTime,
            id: house.id, buildingType: house.buildingType, address: house.address,
            imageURL: house.imageURL, phone: house.phone, description: house.description
        });
    }
    catch{
        console.log("failed to add house")
    }
};

exports.doesHouseExist = async (id) => {
    let result = await House.find({where: {id: id}})
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

