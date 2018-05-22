const fetch = require('node-fetch');
const url  = 'http://139.59.151.5:6664/bank/pay';

function setStatus(response) {
    if (response.status === 200) {
        return true;
    }
    else if (response.status === 500) {
        return false;
    }
}

const functions = {
    async sendPayRequestAndGetResponse(value) {
        try {
            let data = {
                userID: '123',
                value: value.toString()
            };

            let postOptions = {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': '1f897630-12f5-11e8-87b4-496f79ef1988'
                }
            };
            console.log("body is: " + postOptions.body);
            let response = await fetch(url, postOptions);
            return await setStatus(response);

        }
        catch (e) {
                console.log('problem with request: ' + e.message);
        }
    }
};

module.exports = functions;