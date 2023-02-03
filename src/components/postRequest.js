const HttpsProxyAgent = require('https-proxy-agent');
var { activeUsers } = require('../globals');
const fetch = require('node-fetch');

module.exports = postRequest = (url, xhr_headers, params, sendingPk) => new Promise(function(resolve, reject) {
    let proxy = activeUsers[sendingPk].pickedIP;
    fetch(url, {
        method: 'POST',
        headers: xhr_headers,
        body: params,
        credentials: 'omit',
        agent: proxy ? (new HttpsProxyAgent('http://' + proxy)) : null
    })
    .then(async(response) => {
      return response.status;
    })
    .then((body) => {
      resolve(body)
    })
    .catch((e) => {
        console.log(e)
    })
})