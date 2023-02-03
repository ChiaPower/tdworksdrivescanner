const Chance = require('chance');
const fetch = require('node-fetch');
const Blob = require('node-blob');
const HttpsProxyAgent = require('https-proxy-agent');
var { activeUserList } = require('../globals/activeUsers');
const postRequest = require('../components/postRequest');
// Buraya anticaptcha websitesi - key bilginizi girin.
// Enter your anti captcha website - key here.
const anticaptcha = require('../components/anticaptcha')(' ! KEY AREA ! '); 

class main {
    async checkProxy(proxy) {
        return fetch('https://ipapi.co/json/', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            agent: proxy ? (new HttpsProxyAgent('http://' + proxy)) : null
        })
        .then(response => response.json())
        .then((body) => {
          console.log(body);
        });
    }

    async AntiTest(sendingPk) {
        return new Promise(async function(resolve, reject) {
anticaptcha.setWebsiteURL("https://td.msgsuite.workers.dev");
anticaptcha.setWebsiteKey("1b25fe2c-fa04-4ae0-b1b7-61d10597299c");
anticaptcha.setUserAgent(activeUserList[sendingPk].userAgent);
anticaptcha.createHCaptchaTaskProxyless(function (err, taskId) {
        if (err) {
            console.error(err);
        }
        anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
          activeUserList[sendingPk].tokenKey = taskSolution;
          resolve()
        })
    })
        })
    }


    async FnishCreate(sendingPk, school) {
        return new Promise(async function(resolve, reject) {
            let params = {
                "channel": school,
                "emailAddress": activeUserList[sendingPk].email,
                "recaptcha":    activeUserList[sendingPk].tokenKey,
                "teamDriveName": activeUserList[sendingPk].username,
                "teamDriveThemeId":"random"
            }
                var contentLength = new Blob([encodeURI(params)]).size;
                var xhr_headers = {}
                xhr_headers['Host'] = 'td.msgsuite.workers.dev';
                xhr_headers['Origin'] = 'https://td.msgsuite.workers.dev';
                xhr_headers["Connection"] = "close";
                xhr_headers["Content-Length"] = contentLength
                xhr_headers["User-Agent"] = activeUserList[sendingPk].userAgent;
                xhr_headers['Content-Type'] = 'application/json';
                xhr_headers['Accept'] = '*/*';
                xhr_headers['Referer'] = activeUserList[sendingPk].locationurl;
                xhr_headers["Accept-Encoding"] = "gzip, deflate";
                xhr_headers["Accept-Language"] = 'en-US';
                xhr_headers['X-Requested-With'] = 'XMLHttpRequest';
                postRequest('https://td.msgsuite.workers.dev/drive', xhr_headers, JSON.stringify(params), sendingPk, '2')
                .then((response) => {
                    if(response==407){
                    console.warn("School ID => "+ school +" Result => ✅ Your Shared Drive has successfully been created !");
                    }
                    resolve(response)
                })
                .catch(e => {
                    console.log(e)
                    reject(e)
                });
        })
    }



}

const mainLand = new main();

module.exports = mainLand;