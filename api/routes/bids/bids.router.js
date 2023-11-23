const express = require('express');
const {
  httpAddNewBid,
  httpGetAllBids,
  httpGetHighestBid,
} = require('./bids.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const bidsRouter = express.Router();

bidsRouter.use(validateUser);
bidsRouter.use(extractAuthorization);

bidsRouter.get('/:id', httpGetAllBids);
bidsRouter.get('/', httpGetHighestBid)
bidsRouter.post('/', httpAddNewBid);

module.exports = bidsRouter;