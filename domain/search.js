// const houses = require('../models').house;
// const realstate = require('./realState');
//
// class Search {
//     constructor(minArea,buildingType,dealType,maxPrice){
//         this._minArea = null;
//         this._buildingType = null;
//         this._dealType = null;
//         this._maxRentPrice = null;
//         this._maxSellPrice = null;
//         validateSearchQuery(minArea, buildingType, dealType, maxPrice);
//     }
//
//     validateSearchQuery(minArea, buildingType, dealType, maxPrice){
//         try {
//             if (minArea !== "") {
//                 if (parseInt(minArea) < 0)
//                     throw "arguments are wrong!";
//                 else
//                     this.minArea = minArea;
//             }
//             if(buildingType !== ""){
//                 this.dealType = dealType;
//                 if(not(parseInt(dealType) === 0 || parseInt(dealType) === 1)){
//                     throw "dealType must be either 0 or 1";
//                 }
//             }
//             if(maxPrice !== ""){
//                 if(parseInt(maxPrice) < 0){
//                     throw "price must be positive";
//                 }
//                 if(parseInt(dealType) === 1)
//                     this.maxRentPrice = maxPrice;
//                 else if(parseInt(dealType) === 0){
//                     this.maxSellPrice = maxPrice;
//                 }
//                 else{
//                     this.maxSellPrice = maxPrice;
//                     this.maxRentPrice = maxPrice;
//                 }
//             }
//         }
//         catch(err){
//             console.log("arguments are wrong! " + err.message);
//         }
//     }
//
//     async getRequestedHousesFromAllUsers(query){
//         let requestedHouses ; // should be a json array
//         // Utility.syncDatabase();
//         requestedHouses = getHouseByQuery(query); // bring from DB
//         return requestedHouses;
//     }
//
//     async findRealStateHouseIDs(query,realstate){
//         let searchResults;
//         let houseJSON = realstate.getAllHouses();
//
//     }
//
//     get minArea(){
//         return this._minArea;
//     }
//     get buildingType(){
//         return this._buildingType;
//     }
//     get dealType(){
//         return this._dealType;
//     }
//     get maxRentPrice(){
//         return this._maxRentPrice;
//     }
//     get maxSellPrice(){
//         return this._maxSellPrice;
//     }
//
//     set minArea(minArea){
//         this._minArea = minArea;
//     }
//     set buildingType(buildingType){
//         this._buildingType = buildingType;
//     }
//     set dealType(dealType){
//         this._dealType = dealType;
//     }
//     set maxRentPrice(maxRentPrice){
//         this._maxRentPrice = maxRentPrice;
//     }
//     set maxSellPrice(maxSellPrice){
//         this._maxSellPrice = maxSellPrice;
//     }
// }
//
// module.exports = Search;