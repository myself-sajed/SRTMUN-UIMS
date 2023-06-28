const mongoose = require('mongoose');

const responsibilitiesSchema = new mongoose.Schema({
    committeeName: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: false,
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },

}, { timestamps: true });

module.exports = mongoose.model('responsibilities', responsibilitiesSchema);