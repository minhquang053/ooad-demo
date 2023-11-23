const jwt = require('jsonwebtoken');

const JWT_SECRET = "minhquang-khoinguyen-dothai"

function createAccessToken(userId) {
    const accessToken = jwt.sign({
        iss: "magic-post-access",
        sub: userId,
    }, JWT_SECRET, { expiresIn: '1h' });
    return accessToken;
}

function verifyAccessToken(token) {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.iss === "magic-post-access") {
            return true
        } 
    } catch (err) {} 
    return false;
}

function getUserIdFromToken(token) {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);

        return decoded.sub;
    } catch (err) {
        return -1;
    }
}

module.exports = {
    createAccessToken,
    verifyAccessToken,
    getUserIdFromToken,
}