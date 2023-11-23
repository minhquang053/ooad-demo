const express = require('express');

const usersRouter = require('./users/users.router');
const auctionsRouter = require('./auctions/auctions.router');
const bidsRouter = require('./bids/bids.router');
const loginRouter = require('./login/login.router');
const visitorsRouter = require('./visitors/visitors.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/auctions', auctionsRouter);
api.use('/bids', bidsRouter);
api.use('/login', loginRouter);
api.use('/visitors', visitorsRouter)

module.exports = api;