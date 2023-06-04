const mongoose = require('mongoose');

const participant = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    house: {
        type: String,
        required: true
    },
    team: { 
        type: String,
        required: true,
        default: "None"
    }
});

module.exports = mongoose.model('participant', participant);
