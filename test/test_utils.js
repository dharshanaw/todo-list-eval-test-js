export const generateRandDescription =() => {
    var crypto = require("crypto");
    return crypto.randomBytes(5).toString('hex');
}