const mongoose = require('mongoose');

const jrfsrfSchema = new mongoose.Schema({

    researchName: {
        type: 'string',
        required: true,
    },
    enrolmentYear: {
        type: 'string',
        required: false,
    },
    fellowshipDuration: {
        type: 'string',
        required: true,
    },
    fellowshipType: {
        type: 'string',
        required: true,
    },
    grantingAgency: {
        type: 'string',
        required: true,
    },
    qualifyingExam: {
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
    studentId:{
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('jrfsrf', jrfsrfSchema);