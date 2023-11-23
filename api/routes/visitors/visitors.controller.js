const {
    getAllAuctions,
    getAuctionById,
} = require('../../models/auctions.model');
const {
    createNewUser,
} = require('../../models/users.model');

async function httpGetAllAuctions(req, res) {
    const title = req.query.title;
    console.log(title);

    const auctions = await getAllAuctions(title, null);
    
    return res.status(200).json(auctions);
}

async function httpGetAuctionById(req, res) {
    const auctionId = req.params.id;

    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return res.status(404).json({
            error: 'Auction not found',
        });
    }

    console.log(auction);

    return res.status(200).json(auction);
}

async function httpCreateAccount(req, res) {
    const user = req.body;
    try {
        await createNewUser(user);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(201).json(user);
}

module.exports = {
    httpGetAllAuctions,
    httpGetAuctionById,
    httpCreateAccount,
}