const House = require('../domain/house');
const debug = require('debug')('house')
    , name = 'KhaneBeDoosh';

exports.createHouseFromRequest = async (req) => {
    try {
        let sellPrice = 0;
        let rentPrice = 0;
        let basePrice = 0;
        let dealType = parseInt(req.body.dealType);
        let buildingType = req.body.buildingType;
        let price = parseInt(req.body.price);
        let address = req.body.address;
        let description = req.body.description;
        let phone = req.body.phone;
        let area = parseInt(req.body.area);

        if (!dealType.isNaN && buildingType !== undefined && price.isNaN &&
            address !== undefined && description !== undefined && !area.isNaN && phone !== undefined) {
            if (buildingType === "" || address === "" || description === "" || phone ==="")
                throw Error('empty parameters in your query');
        } else
            throw Error("missing parameter in your query");

        if (dealType === 0) {
            sellPrice = price;
        } else if (dealType === 1) {
            rentPrice = price;
        } else
            throw Error('wrong dealType assigned');

        if (basePrice < 0 || rentPrice < 0 || sellPrice < 0 || area < 0)
            throw Error('negative numbers are not allowed');

        const uuidv4 = require('uuid/v4');
        return new House(uuidv4(),buildingType,address,null,phone,description,null, area, basePrice,
            rentPrice, sellPrice, dealType);

    } catch (e) {
        console.log("the was a problem in creating-house request: " + e.message);
        throw(e);
    }
};