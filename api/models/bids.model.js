const Bid = require('./bids.mongo');

const {
    generateUuid
} = require('../services/uuid');

async function getBidsByUserId(userId) {
    return await Bid
        .find({ userId: userId })
};

async function getBidsByAuctionId(auctionId) {
    return await Bid
        .find({ auctionId: auctionId })
}

async function saveBid(bid) {
    await Bid.create(bid);
}

async function createNewBid(bid) {
    const newBid = Object.assign(bid, {
        bidId: generateUuid(),
        auctionId: bid.auctionId,
        userId: bid.userId,
        price: bid.price,
        placedAt: bid.placedAt,
    })
    await saveBid(newBid);
}

module.exports = {
    getBidsByUserId,
    getBidsByAuctionId,
    createNewBid,
}