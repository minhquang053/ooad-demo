const bcrypt = require('bcrypt');

const salt = 10;

async function getHashedPassword(password) {
    return bcrypt.hash(password, salt);
}

module.exports = {
    getHashedPassword,
}