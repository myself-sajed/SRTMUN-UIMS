const mongoose = require('mongoose');

const directorAQAR = new mongoose.Schema({

    schoolName: {
        type: 'string',
        required: true,
    },
    aqarData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('directoraqar', directorAQAR);