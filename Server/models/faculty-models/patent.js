const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({

    patenterName: {
        type: 'string',
        required: true,
    },
    patentNumber: {
        type: 'string',
        required: true,
    },
    patentTitle: {
        type: 'string',
        required: true,
    },
    isNat: {
        type: 'string',
        required: true,
    },
    awardYear: {
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

module.exports = mongoose.model('patent', patentSchema);