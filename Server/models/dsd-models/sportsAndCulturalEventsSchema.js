const mongoose = require('mongoose');

const sportsAndCulturalEventsSchema = new mongoose.Schema({

    dateOfEvent: {
        type: 'string',
        required: true,
    },
    nameOfEvent: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    Proof: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('SportsAndCulturalEvents', sportsAndCulturalEventsSchema);