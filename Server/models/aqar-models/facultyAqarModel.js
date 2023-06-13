const mongoose = require('mongoose');

const facultyAQAR = new mongoose.Schema({

    userId: {
        type: 'string',
        required: true,
        ref: "users"
    },
    aqarData: {
        type: [{ type: String }],
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('facultyaqar', facultyAQAR);