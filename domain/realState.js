const fetch = require('node-fetch');
const User = require ('./user');
const RealStateModel = require('../models').RealStates;

class RealState extends User {
    constructor(name, url , isAdmin) {
        super(name, isAdmin);
        this._url = url;
        // add this realstate to DB
    }
    async getAllHouses(){
        let response = await fetch(this.url, {
            method: 'GET',
            headers: {
                'content_type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(function(error) {
                console.log('request failed in getting all houses', error);
            })
        return response;
    }

    async getHouseByID(id){
        let url = this.url + "/" + id;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'content_type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(function(error) {
                console.log('request failed in getting house by id', error);
            })
        return response.data;
    }

    async addHousesFromRealStateToDB(){
        try {
            let houses = realState.getAllHouses().data;
            let expireTime = housesJSON.getLong("expireTime");
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject houseJSON = jsonArray.getJSONObject(i);
                if (!Houses.doesHouseExist(houseJSON.getString("id"))) {
                    House house = House.createHouseFromJSONAndTimeStamp(houseJSON, expireTime);
                    Houses.addHouse(house);
                    Owns.addUserOwnsHouseRelation(house.getId(),null,realState.getUrl());
                }
            }
        } catch (IOException ex) {
            System.out.println("couldn't get houses from server");
        }
    }

    get url() {
        return this._url;
    }


}

module.exports = RealState;

// realstate = new RealState("reallllstateeee","http://139.59.151.5:6664/khaneBeDoosh/v2/house",false);
//
// let result = realstate.getHouseByID("2f5807f7-813b-48c5-9f65-4f280e71f97a");
// result.then(function(result) {
//     console.log(result) //will log results.
// })