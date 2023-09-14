const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    submitted: {
        type: [{ type: String }],
        require: false,
        default: [],
    },

}, { timestamps: true });

module.exports = mongoose.model('yfSubmitted', schema);