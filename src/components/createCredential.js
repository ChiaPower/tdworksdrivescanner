const Chance = require("chance");
let { activeUsers } = require('../globals');

module.exports = {
    createCredential(pk, username, email, pickedIP) {
        return new Promise((resolve, reject) => {
            let chance = new Chance(pk);
            const id = chance.string({
                pool: 'abcdef0123456789',
                length: 32,
            });
            let deviceVersion = chance.integer({ min: 9, max: 24 });
            let deviceSoftware = `android-${deviceVersion}`;
            let userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`;

            activeUsers[pk] = {
                "_id": pk,
                "pickedIP": pickedIP,
                "email": email,
                "username": username,
                "deviceVersion": deviceVersion,
                "deviceSoftware": deviceSoftware,
                "userAgent": userAgent,
            }
            resolve()
            .catch((error) => reject(error))
        })
    }
}