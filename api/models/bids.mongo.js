const mongoose = require('mongoose');

const bidsSchema = new mongoose.Schema({
    bidId: {
        type: String,
        required: true,
    },
    auctionId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true, 
    },
    placedAt: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Bid', bidsSchema);