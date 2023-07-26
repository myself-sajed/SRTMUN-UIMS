const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
    headline: {
        type: 'string',
        required: true,
    },
    date: {
        type: 'string',
        required: true,
    },
    slug: {
        type: 'string',
        required: true,
        unique: true
    },
    desc: {
        type: 'string',
        required: false,
    },
    photoURL: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('news', newsItemSchema);