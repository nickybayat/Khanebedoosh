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

    createHouseFromJSON(house){
        let rentPrice = 0;
        let sellPrice = 0;
        let basePrice = 0;
        if (house.dealType === 1 ) {
            rentPrice = house.price.rentPrice;
            basePrice = house.price.basePrice;
        }
        else if(house.dealType === 0)
            sellPrice = house.price.sellPrice;

        let buildingType ;
        if(house.buildingType === "ویلایی")
            buildingType = "villa";
        else if(house.buildingType === "آپارتمان")
            buildingType = "apartment";

        return new House(house.id,buildingType,house.address,house.imageURL,
            house.phone,house.description,null,house.area,basePrice,
            rentPrice,sellPrice,house.dealType);
    }

    createHouseFromJSONAndTimeStamp(house,expireTime){
        let rentPrice = 0;
        let sellPrice = 0;
        let basePrice = 0;
        if (house.dealType === 1 ) {
            rentPrice = house.price.rentPrice;
            basePrice = house.price.basePrice;
        }
        else if(house.dealType === 0)
            sellPrice = house.price.sellPrice;

        let buildingType ;
        if(house.buildingType === "ویلایی")
            buildingType = "villa";
        else if(house.buildingType === "آپارتمان")
            buildingType = "apartment";

        return new House(house.id,buildingType,house.address,house.imageURL,
            house.phone,house.description,null,house.area,basePrice,
            rentPrice,sellPrice,house.dealType);

        return new House(house.id,buildingType,house.address,house.imageURL,null,null,expireTime,
            house.area,basePrice,rentPrice,sellPrice,house.dealType);
    }

    getDealTypeString(){
        if(this.dealType === 0)
            return "فروش";
        else
            return "رهن و اجاره";
    }

    getPersianBuildingType(){
        if(this.buildingType === "apartment")
            return "آپارتمان";
        else if (this.buildingType === "villa")
            return "ویلایی";
        return null;
    }

    get id(){
        return this._id;
    }
    get buildingType(){
        return this._buildingType;
    }
    get address(){
        return this._address;
    }
    get imageURL(){
        return this._imageURL;
    }
    get phone(){
        return this._phone;
    }
    get description(){
        return this._description;
    }
    get expireTime(){
        return this._expireTime;
    }
    get area(){
        return this._area;
    }
    get basePrice(){
        return this._basePrice;
    }
    get rentPrice(){
        return this._rentPrice;
    }
    get sellPrice(){
        return this._sellPrice;
    }
    get dealType(){
        return this._dealType;
    }
}


module.exports = House;