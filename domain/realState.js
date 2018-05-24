const fetch = require('node-fetch');
const User = require ('./user');
const houseData = require('../data/house');
const House = require('../domain/house');
const RealStateModel = require('../models').RealStates;
const debug = require('debug')('realState')
    , name = 'KhaneBeDoosh';

class RealState extends User {
    constructor(name, url, isAdmin) {
        super(name, isAdmin);
        this._url = url;
    }

    async getAllHouses() {
        let response = await fetch(this.url, {
            method: 'GET',
            headers: {
                'content_type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(function (error) {
                console.log('request failed in getting all houses', error);
            });
        return response;
    }

    async getHouseByID(id) {
        let url = this.url + "/" + id;
        debug(url);
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'content_type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const json = await(response.json());
            debug(JSON.stringify(json));
            let result = json.data;
            if (result === undefined)
                return result;
            let basePrice = 0;
            let rentPrice = 0;
            let sellPrice = 0;
            if (result.dealType === 1)
                rentPrice = result.price.rentPrice;
            else if (result.dealType===0 )
                sellPrice = result.price.sellPrice;
            let buildingType = '';
            if(result.buildingType==="ویلایی")
                buildingType = "villa";
            else if(result.buildingType==="آپارتمان")
                buildingType = "apartment";
            return new House(result.id, buildingType, result.address, result.imageURL, result.phone,
                result.description, null, result.area, basePrice, rentPrice, sellPrice,
                result.dealType);
        }
        catch (error) {
            console.log('request failed in getting house by id', error);
        }
    }

    async addHousesFromRealStateToDB(){
        try {
            let houses = await this.getAllHouses();
            let houseArray = houses.data;
            let expireTime = houses.expireTime;
            for (let i = 0; i < houseArray.length; i++) {
                let newHouse = houseArray[i];
                if (await houseData.doesHouseExist(newHouse.id) === false) {
                    await houseData.addHouse(newHouse);
                }
            }
        } catch {
            debug("problem in addHousesFromRealStateToDB");
        }
    }

    get url() {
        return this._url;
    }


}

module.exports = RealState;

// realstate = new RealState("reallllstateeee","http://139.59.151.5:6664/khaneBeDoosh/v2/house",false);
//
// let result = realstate.addHousesFromRealStateToDB();

// let newHouse = new House(279,95352,8084,0,1,1525617338100,"2d5e0cd4-d6c2-4ac3-9919-faca42046bb2","villa","احتشامیه","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/German_House.jpg/320px-German_House.jpg",null,null);
// try {
//     houseData.addHouse(newHouse);
// }
// catch (e) {
//     debug('msg: Illegal Argument in request: ' + e.message);
// }