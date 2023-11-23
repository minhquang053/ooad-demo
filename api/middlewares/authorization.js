const { getUserIdFromToken } = require("../services/jwt");

function extractAuthorization(req, res, next) {
    const accessToken = req.headers.authorization;
    const userId = getUserIdFromToken(accessToken);
    if (userId > 0) {
        req.uid = userId;
        next();
    } else {
        return res.status(400).json({
            error: "Corrupted access token"
        })
    }
}

module.exports = {
    extractAuthorization
}