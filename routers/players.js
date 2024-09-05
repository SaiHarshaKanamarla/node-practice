const express = require('express')
const router = express.Router();

const player = require('../models/players');


router.get('/players', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.params) || 10;

    const skip = (page - 1) * limit;
    const totalPlayers = await player.countDocuments();
    const playersResult = await player.find({}).select('nameFirst nameLast nameGiven birthCountry birthCity').limit(limit).skip(skip);
    res.status(200).json({
        page,
        totalPlayers: totalPlayers,
        players: playersResult
    })
});

module.exports = router;