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
    indexedIn: {
        type: 'string',
    },
    indexData: {
        type: [{ type: String }],
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

module.exports = mongoose.model('researchPapers', researchPapersSchema);