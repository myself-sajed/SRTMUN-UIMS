const mongoose = require('mongoose');

const alumniUserSchema = new mongoose.Schema({
    salutation: {
        type: 'string',
        required: true,
    },
    photoURL: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: false,
    },
    dob: {
        type: 'string',
        required: false,
    },
    doCompleted: {
        type: 'string',
        required: false,
    },
    doStarted: {
        type: 'string',
        required: false,
    },
    mobile: {
        type: 'string',
        required: true,
    },
    programGraduated: {
        type: ["string"],
        required: false,
    },

    schoolName: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    },
    Upload_Proof: {
        type: 'string',
        required: false,
    }

})

const AlumniUser = new mongoose.model('AlumniUser', alumniUserSchema);

module.exports = AlumniUser;