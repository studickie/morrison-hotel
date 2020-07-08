const mongoose = require('mongoose');

const options = {
    capped: {
        size: 1000,
        max: 50
    }
};

const RatingSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    posted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, options);

module.exports = mongoose.model('Rating', RatingSchema);