const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({

    title: {
        type: 'string',
        required: true,
    },
    duration: {
        type: 'string',
        required: true
    },
    photos: {
        type: [{ type: Object }],
        required: false,
    },
    arrangedBy: {
        type: 'string',
        required: true
    },
    finalRegistrationDate: {
        type: 'string',
        required: true
    },
    summary: {
        type: 'string',
        required: true
    },
    pPhotoURL: {
        type: 'string',
        required: true
    },
    pName: {
        type: 'string',
        required: true
    },
    pDesignation: {
        type: 'string',
        required: true
    },
    pAddress: {
        type: 'string',
        required: true
    },
    cName0: {
        type: 'string',
        required: true
    },
    cName1: {
        type: 'string',
        required: true
    },
    cPosition0: {
        type: 'string',
        required: true
    },
    cPosition1: {
        type: 'string',
        required: true
    },
    cEmail0: {
        type: 'string',
        required: true
    },
    cEmail1: {
        type: 'string',
        required: true
    },
    cPhone0: {
        type: 'string',
        required: true
    },
    cPhone1: {
        type: 'string',
        required: true
    },
    registrationResponse: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('programs', programSchema);