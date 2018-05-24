const houseModel = require('../models').house;
const realstate = require('./realState');
Sequelize = require('sequelize');
const debug = require('debug')('http')
    , http = require('http')
    , name = 'KhaneBeDoosh';

class Search {
    constructor(minArea,buildingType,dealType,maxPrice){
        this._minArea = null;
        this._buildingType = null;
        this._dealType = null;
        this._maxRentPrice = null;
        this._maxSellPrice = null;
        this.validateSearchQuery(minArea, buildingType, dealType, maxPrice);
    }

    validateSearchQuery(minArea, buildingType, dealType, maxPrice){
        try {
            if (minArea !== "") {
                if (parseInt(minArea) < 0) {
                    debug("problem in minArea");
                    throw "arguments are wrong!";
                }
                else
                    this.minArea = minArea;
            }
            if(buildingType !== ""){
                this.dealType = dealType;
                if(not(parseInt(dealType) === 0 || parseInt(dealType) === 1)){
                    debug('problem with dealType');
                    throw "dealType must be either 0 or 1";
                }
            }
            if(maxPrice !== ""){
                if(parseInt(maxPrice) < 0){
                    debug('problem with maxPrice');
                    throw "price must be positive";
                }
                if(parseInt(dealType) === 1)
                    this.maxRentPrice = maxPrice;
                else if(parseInt(dealType) === 0){
                    this.maxSellPrice = maxPrice;
                }
                else{
                    this.maxSellPrice = maxPrice;
                    this.maxRentPrice = maxPrice;
                }
            }
        }
        catch(err){
            debug('here in catch');
            console.log("arguments are wrong! " + err.message);
        }
    }

    async getRequestedHousesFromAllUsers(query){
        let requestedHouses ; // should be a json array
        // Utility.syncDatabase();
        requestedHouses = this.getHouseByQuery(query); // bring from DB
        return requestedHouses;
    }

    async getHouseByQuery(query){
        let sql1 = "SELECT * FROM houses WHERE (id IS NOT NULL)" +
            (query.minArea === null ? "" : " AND (area >= " + query.minArea + ")" ) +
            (query.dealType === null ? "" : " AND (dealType = " + query.dealType + ")" ) +
            (query.buildingType === null ? "" : " AND (buildingType LIKE '" + query.buildingType + "')" ) +
            (query.dealType === null
                ? ((query.maxRentPrice !== null ) ? " AND ((rentPrice <= " + query.maxRentPrice + ") OR rentPrice = NULL)" :
                    (query.maxSellPrice !== null ) ? " AND ((sellPrice <= " + query.maxSellPrice + ") OR sellPrice = NULL)" : "")
                : (parseInt(query.dealType) === 1
                    ? (query.maxRentPrice !== null ? " AND (rentPrice <= " + query.maxRentPrice + ")" : "" )
                    : (query.maxSellPrice !== null ? " AND (sellPrice <= " + query.maxSellPrice + ")" : "" ))) + ";" ;

        const s = new Sequelize({
            database: '../db.khanebedoosh.sqlite',
            dialect: 'sqlite'
        });
        let result = await s.query(sql1, { type: Sequelize.QueryTypes.SELECT})
            .then(houses => {

            })
            .catch(function(error) {
                console.log('request failed in getting searched houses', error.message);
            })
        // return result.toJSON();

    }

    async findRealStateHouseIDs(query,realstate){
        let searchResults;
        let houseJSON = realstate.getAllHouses().data;
        for (let i = 0; i < houseJSON.length; i++) {
            let house = houseJSON[i];
            if (query.evaluateHouse(house)) {
                searchResults.add(house.id);
            }
        }
        return searchResults;
    }

    evaluateHouse(house){
        let isAreaOK = isAreaOK(house);
        let isDealTypeOK = isDealTypeOK(house);
        let isBuildingTypeOK = isBuildingTypeOK(house);
        let isPriceOK = isPriceOK(house, isDealTypeOK);
        return (isAreaOK && isBuildingTypeOK && isDealTypeOK && isPriceOK);
    }

    isPriceOK(house,isDealTypeOK){
        if (this.dealType !== null && isDealTypeOK) {
            if (parseInt(this.dealType) === 1)
                if ((this.maxRentPrice !== null && parseInt(house.rentPrice) <= parseInt(this.maxRentPrice))
                    || this.maxRentPrice === null)
                    return true;
            if (parseInt(this.dealType) === 0)
                if ((this.maxSellPrice !== null && parseInt(house.sellPrice) <= parseInt(this.maxSellPrice))
                    || this.maxSellPrice === null)
                    return true;
        }
        if (this.dealType === null) {
            if ((this.maxRentPrice !== null && parseInt(house.dealType) === 1 &&
                    parseInt(house.rentPrice) <= parseInt(this.maxRentPrice)) ||
                this.maxRentPrice === null)
                return true;
            if ((this.maxSellPrice !== null && parseInt(house.dealType) === 0 &&
                    parseInt(house.sellPrice) <= parseInt(this.maxSellPrice)) ||
                this.maxSellPrice === null)
                return true;
        }
        return false;
    }

    isBuildingTypeOK(house){
        return (this.buildingType === null ||
            (this.buildingType === house.buildingType));
    }

    isDealTypeOK(house){
        return ((this.dealType !== null && house.dealType === this.dealType) ||
            this.dealType === null);
    }

    isAreaOK(house){
        return ((this.minArea !== null && (parseInt(house.area) >= this.minArea)) || this.minArea === null);
    }

    get minArea(){
        return this._minArea;
    }
    get buildingType(){
        return this._buildingType;
    }
    get dealType(){
        return this._dealType;
    }
    get maxRentPrice(){
        return this._maxRentPrice;
    }
    get maxSellPrice(){
        return this._maxSellPrice;
    }

    set minArea(minArea){
        this._minArea = minArea;
    }
    set buildingType(buildingType){
        this._buildingType = buildingType;
    }
    set dealType(dealType){
        this._dealType = dealType;
    }
    set maxRentPrice(maxRentPrice){
        this._maxRentPrice = maxRentPrice;
    }
    set maxSellPrice(maxSellPrice){
        this._maxSellPrice = maxSellPrice;
    }
}

module.exports = Search;