const mongoose = require('mongoose');

const responsibilitiesSchema = new mongoose.Schema({
    committeeName: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    institute: {
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
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('responsibilities', responsibilitiesSchema);