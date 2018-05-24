const Individual = require('./individual');
const RealState = require('./realState');
const individual = new Individual("بهنام همایون", "021123456", 0, 'behnamhomayoon', 'password', false);
const realState = new RealState('http://139.59.151.5:6664/khaneBeDoosh/v2/house','KhaneBeDoosh', false);
exports.individual = individual;
exports.realstate = realState;
