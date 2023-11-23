const express = require('express');
const {
    httpGetAllAuctions,
    httpGetAuctionById,
    httpAddNewAuction,
    httpApproveAuctionById,
    httpDeleteAuctionById,
} = require('./auctions.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const auctionsRouter = express.Router();

auctionsRouter.use(validateUser);
auctionsRouter.use(extractAuthorization);

auctionsRouter.get('/', httpGetAllAuctions);
auctionsRouter.get('/:id', httpGetAuctionById);
auctionsRouter.post('/', httpAddNewAuction);
auctionsRouter.patch('/:id', httpApproveAuctionById);
auctionsRouter.delete('/:id', httpDeleteAuctionById);

module.exports = auctionsRouter;