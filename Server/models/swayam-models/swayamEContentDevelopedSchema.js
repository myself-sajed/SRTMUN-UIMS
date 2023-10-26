const mongoose = require('mongoose');

const swayamEContentDevelopedSchema = new mongoose.Schema({
    moduleName: {
        type: 'string',
        required: true,
    },
    creationType: {
        type: 'string',
        required: true,
    },
    platform: {
        type: 'string',
        required: false,
    },
    link: {
        type: 'string',
        required: false,
    },
    year: {
        type: 'string',
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('swayamEContentDeveloped', swayamEContentDevelopedSchema);