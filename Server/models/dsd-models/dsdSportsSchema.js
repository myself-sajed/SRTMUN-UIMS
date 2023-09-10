const mongoose = require('mongoose');

const dsdSportsSchema = new mongoose.Schema({

    nameOfAward: {
        type: 'string',
        required: true,
    },
    nameOfEvent: {
        type: 'string',
        required: true,
    },
    nameOfStudnt: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    teamIndividual: {
        type: 'string',
        required: true,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    isDsd: {
        type: 'boolean',
        required: true,
    },
    Proof: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('dsdSports', dsdSportsSchema);