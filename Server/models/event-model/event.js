const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    eventTitle: {
        type: 'string',
        required: true,
        unique: true
    },
    photos: {
        type: [{ type: Object }],
        required: true,
    },
    schoolName: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('events', eventSchema);