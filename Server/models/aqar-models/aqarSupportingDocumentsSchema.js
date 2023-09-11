const mongoose = require('mongoose');

const aqarSupportingDocumentsSchema = new mongoose.Schema({

    proofType: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('AqarSupportingDocuments', aqarSupportingDocumentsSchema);