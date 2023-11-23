const { verifyAccessToken } = require('../services/jwt');

function validateUser(req, res, next) {
    try {
        const accessToken = req.headers.authorization;
        if (verifyAccessToken(accessToken)) {
            next()
        } else {
            return res.status(403).json({
                error: "Unauthenticated user"
            })
        } 
    } catch (err) {
        console.log(err.message);
    } 
}

module.exports = {
    validateUser
}