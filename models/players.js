const mongoose = require('mongoose');

const playersSchema = mongoose.Schema({
    nameFirst: { type: String, required: true },
    nameLast: { type: String, required: true },
    nameGiven: { type: String, required: true },
    birthCountry: { type: String, required: true },
    birthCity: { type: String, required: true },
}, { timestamps: true, strict: true })

const player = mongoose.model('players', playersSchema);

module.exports = player;