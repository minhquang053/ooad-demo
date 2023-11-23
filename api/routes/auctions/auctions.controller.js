const {
    getAllAuctions,
    getAuctionById,
    approveAuctionById,
    createNewAuction,
} = require('../../models/auctions.model');

const {
    getUserById
} = require('../../models/users.model');

async function httpGetAllAuctions(req, res) {
    const userId = req.uid;
    const title = req.query.title;

    const auctions = await getAllAuctions(title, userId);
    
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

async function httpApproveAuctionById(req, res) {
    const auctionId = req.params.id;

    const requestingUser = await getUserById(req.uid);
    if (!requestingUser.isAdmin) {
        return res.status(401).json({
            error: "Permission required"
        });
    }

    const auction = await approveAuctionById(auctionId);

    if (!auction) {
        return res.status(400).json({
            error: "Auction not found"
        })
    }

    return res.status(200).json(auction);
}

async function httpAddNewAuction(req, res) {
    const auction = req.body;
 
    try {
        const createdAuction = await createNewAuction(auction)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }

    return res.status(201).json(auction);
}

module.exports = {
    httpGetAllAuctions,
    httpGetAuctionById,
    httpAddNewAuction,
    httpApproveAuctionById,
}