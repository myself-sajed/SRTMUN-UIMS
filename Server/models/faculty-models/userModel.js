const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    salutation: {
        type: 'string',
        required: true,
    },
    photoURL: {
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    specialization: {
        type: 'string',
        required: false,
    },
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    promotionDate: {
        type: 'string',
        required: false,
    },
    gradePay: {
        type: 'string',
        required: false,
    },
    address: {
        type: 'string',
        required: false,
    },
    mobile: {
        type: 'string',
        required: false,
    },
    dob: {
        type: 'string',
        required: false,
    },
    racDate: {
        type: 'string',
        required: false,
    },
    cast: {
        type: 'string',
        required: false,
    },
    designation: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    orcidId: {
        type: 'string',
        required: true,
    },
    scopusId: {
        type: 'string',
        required: true,
    },
    researcherId: {
        type: 'string',
        required: true,
    },
    googleScholarId: {
        type: 'string',
        required: true,
    },
    personalWebsiteLink: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);