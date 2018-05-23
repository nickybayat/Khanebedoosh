const fetch = require('node-fetch');
const User = require ('./user');
const individual = require('../models').RealStates;

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