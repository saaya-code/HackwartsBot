const mongoose = require('mongoose');


const Team = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    challenges: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('team', Team);
