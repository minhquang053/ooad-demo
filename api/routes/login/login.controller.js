const bcrypt = require('bcrypt');

const { getUserByEmail } = require('../../models/users.model');
const { createAccessToken } = require('../../services/jwt');

// to replace with environment variable later

async function httpLogin(req, res) {
    const login = req.body;
    const user = await getUserByEmail(login.email);
    if (!user) {
        return res.status(400).json({
            error: "Invalid user"
        })
    }
    bcrypt.compare(login.password, user.password)
    .then(async valid => {
        if (valid) {
            return res.status(200).json({
                uid: user.userId,
                token: createAccessToken(user.userId),
            });
        } else {
            return res.status(400).json({
                error: "Invalid user"
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: "Couldn't validate user"
        })
    });
}

module.exports = {
    httpLogin,
}