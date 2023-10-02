const mongoose = require('mongoose');

const heAdminSchema = new mongoose.Schema({

    nameOfStudent: {
        type: 'string',
        required: true,
    },
    programGraduated: {
        type: 'string',
        required: false,
    },
    nameOfInstitution: {
        type: 'string',
        required: true,
    },
    programmeAdmitted: {
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
    schoolName: {
        type: 'string',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('heAdmin', heAdminSchema);