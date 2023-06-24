const mongoose = require('mongoose');

const bookAndChaptersSchema = new mongoose.Schema({
    titleOfBook: {
        type: 'string',
        required: false,
    },
    paperTitle: {
        type: 'string',
        required: false,
    },
    titleOfProceeding: {
        type: 'string',
        required: false,
    },
    conName: {
        type: 'string',
        required: false,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    publicationYear: {
        type: 'string',
        required: true,
    },
    issnNumber: {
        type: 'string',
        required: true,
    },
    aff: {
        type: 'string',
        required: true,
    },
    publisherName: {
        type: 'string',
        required: true,
    },
    type: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('bookAndChapters', bookAndChaptersSchema);