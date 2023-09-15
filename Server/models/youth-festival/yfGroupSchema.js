const mongoose = require('mongoose');

const yfGroupSchema = new mongoose.Schema({

    participantNames: {
        type: 'string',
        required: true,
    },
    namesOfCompetition: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('YfGroup', yfGroupSchema);