const mongoose = require('mongoose');

const options = {
    capped: {
        size: 1000,
        max: 50
    }
};

const WatchlistSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true,
        unique: true
    }
}, options);

module.exports = mongoose.model('Watchlist', WatchlistSchema);