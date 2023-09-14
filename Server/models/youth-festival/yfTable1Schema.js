const mongoose = require('mongoose');

const yfTable1Schema = new mongoose.Schema({

    partnerName: {
        type: 'string',
        required: true,
    },
    permentAddress: {
        type: 'string',
        required: true,
    },
    mobileNo: {
        type: 'string',
        required: true,
    },
    dob: {
        type: 'string',
        required: true
    },
    bloodGroup: {
        type: 'string',
        required: true
    },
    namesOfCompetition: {
        type: 'array',
        required: true
    },
    academicYear: {
        type: 'string',
        required: true
    },
    photoURL: {
        type: 'string',
        required: true
    },
    collageId: {
        type: 'string',
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('YfTable1', yfTable1Schema);