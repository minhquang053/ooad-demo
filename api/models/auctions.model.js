const Auction = require('./auctions.mongo');

const {
    generateUuid
} = require('../services/uuid');
const {
    getUserById
} = require('./users.model');

async function getAllAuctions(title, userId) {
    if (title) {
        const regex = new RegExp(title, 'i');
        return await Auction
        .find({ title: regex })
    } else if (userId) {
        const user = await getUserById(userId);
        if (user.isAdmin) {
            return await Auction
            .find({ approved: false });
        }
        return await Auction
        .find({ userId: userId })
    } else {
        return await Auction
        .find()
    }
};

async function getAuctionById(auctionId) {
    return await Auction
        .findOne({ auctionId: auctionId })
}

async function approveAuctionById(auctionId) {
    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return null;
    }
    const now = new Date().toLocaleString();
    auction.approved = true;
    auction.lastUpdated = now;
    auction.save();
    return auction;
}

async function saveAuction(auction) {
    await Auction.create(auction);
}

async function createNewAuction(auction) {
    const now = new Date().toLocaleString();

    const newAuction = Object.assign(auction, {
        auctionId: generateUuid(),
        userId: auction.userId,
        category: auction.category,
        title: auction.title,
        description: auction.description,
        imageUrl: auction.imageUrl,
        initPrice: auction.initPrice,
        approved: false,
        lastUpdated: now,
    })
    await saveAuction(newAuction);
    
    return newAuction;
}

async function deleteAuctionById(auctionId) {
    const auction = Auction.findOneAndDelete({ auctionId: auctionId });
    return auction;
}

module.exports = {
    getAllAuctions,
    getAuctionById,
    approveAuctionById,
    createNewAuction,
    deleteAuctionById,
}