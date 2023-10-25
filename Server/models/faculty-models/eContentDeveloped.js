const mongoose = require('mongoose');

const eContentDevelopedSchema = new mongoose.Schema({
    moduleName: {
        type: 'string',
        required: true,
    },
    creationType: {
        type: 'string',
        required: false,
    },
    platform: {
        type: 'string',
        required: false,
    },
    link: {
        type: 'string',
        required: false,
    },
    proof: {
        type: 'string',
        required: false,
    },
    year: {
        type: 'string',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }



}, { timestamps: true });

module.exports = mongoose.model('eContentDeveloped', eContentDevelopedSchema);