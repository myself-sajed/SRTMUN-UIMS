const mongoose = require('mongoose');

const expertFeedbackSchema = new mongoose.Schema({

    academicYear: {
        type: 'string',
        required: true,
    },
    schoolName: {
        type: 'string',
        required: true,
    },
    questions: {
        type: 'string',
        required: false,
    },
    response: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('expertfeedback', expertFeedbackSchema);