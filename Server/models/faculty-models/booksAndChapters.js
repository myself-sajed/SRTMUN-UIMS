const mongoose = require('mongoose');

const bookAndChaptersSchema = new mongoose.Schema({
    teacherName: {
        type: 'string',
        required: true,
    },
    titleOfBook: {
        type: 'string',
        required: true,
    },
    paperTitle: {
        type: 'string',
        required: true,
    },
    authorEditor: {
        type: 'string',
        required: true,
    },
    titleOfProceeding: {
        type: 'string',
        required: true,
    },
    conName: {
        type: 'string',
        required: true,
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
    schoolName: {
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