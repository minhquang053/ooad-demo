const express = require('express');
const {
    httpLogin,
} = require('./login.controller');

const loginRouter = express.Router();

loginRouter.post('/', httpLogin);

module.exports = loginRouter;