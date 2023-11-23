const express = require('express');

const {
    httpGetAllAuctions,
    httpGetAuctionById,
    httpCreateAccount,
} = require('./visitors.controller');

const visitorsRouter = express.Router();

visitorsRouter.get('/', httpGetAllAuctions);
visitorsRouter.get('/:id', httpGetAuctionById);
visitorsRouter.post('/', httpCreateAccount);

module.exports = visitorsRouter;