const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    academicYear: {
        type: 'string',
        required: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    info: {
        type: 'string',
        required: false,
    },
    proofType: {
        type: 'string',
        required: true,
    },
    proof: {
        type: 'string',
        required: false,
        default: null
    },
})

module.exports = mongoose.model('aqarSupportingDocuments', schema);