const mongoose = require('mongoose');

const auctionsSchema = new mongoose.Schema({
    auctionId: {
        type: String,
        unique: true,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    initPrice: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    },
    lastUpdated: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Auction', auctionsSchema);