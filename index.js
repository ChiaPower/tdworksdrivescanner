const fetch = require('node-fetch');
const driveEngine = require('./src/engine/drive');

class mainClass {
    async start(school_id) {
        return new Promise(async(resolve, reject) => {
        try {

            fetch('https://api.namefake.com', {
                method: 'GET'
            })
            .then((response) => {
                return response.json();
            })
            .then(async(responseJSON) => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const username = responseJSON.maiden_name;
    const userID = ""+Date.now()+"";
    // Varsa proxy bağlantı bilgilerinizi girin, proxysiz site oluşturma engeli uygulayabilir.
    // If available, enter your proxy connection information, it can block creating a proxy site.
    // Proxy Kullanın / USERNAME:PASSWORD@IP:PORT
    const proxy = "";
    const gmail = "EMAIL AREA";

    await driveEngine.CreateTDrive(userID, username, gmail, school_id, proxy)

})
        } catch (error) {
            reject(error);
        }
    })
}
}
const main = new mainClass();
module.exports = main;


fetch('https://td.msgsuite.workers.dev')
.then(response => response.text())
.then(async(html) => {
    const matches = html.match(/<option value="[^"]+"/g);
    const school_ids = matches ? matches.map(match => match.match(/value="([^"]+)"/)[1]) : [];
    school_ids.forEach(school_id =>
    main.start(school_id)
    );
})

