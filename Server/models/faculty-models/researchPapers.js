const mongoose = require('mongoose');

const researchPapersSchema = new mongoose.Schema({
    paperTitle: {
        type: 'string',
        required: true,
    },
    journalName: {
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
    authors: {
        type: 'string',
        required: false,
    },
    indexedIn: {
        type: 'string',
    },
    indexData: {
        type: [{ type: String }],
    },
    indexLink: {
        type: 'string',
    },
    indexLinkData: {
        type: { type: String },
    },
    year: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
    },
    studentId:{
        type: 'string',
        required: false,
    },
    schoolName: {
        type: 'string',
        required: false
    },
    guideName: {
        type: 'string',
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('researchPapers', researchPapersSchema);