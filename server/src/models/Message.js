const mongoose = require('mongoose');

const message = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        max: 500
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', message)