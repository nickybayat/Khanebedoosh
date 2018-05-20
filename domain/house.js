const House = require('../models').House;
const functions = {
    async createHouse () {
        const user = await House.create({username: 'ali', email: 'a@b.c', password: '123'});
        console.log(user);
        return user;
    },
    async getAllUsers () {
        const users = await User.findAll({});
        return users;
    }
};

module.exports = functions;