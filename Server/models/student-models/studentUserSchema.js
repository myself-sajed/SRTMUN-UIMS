const mongoose = require('mongoose');

const studentUserSchema = new mongoose.Schema({
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
    mobile: {
        type: 'string',
        required: true,
    },
    programGraduated: {
        type: 'string',
        required: true,
    },
    programEnroledOn:{
        type: 'string',
        required: true,
    },
    cast:{
        type: 'string',
        required: true,
    },
    religion: {
        type: 'string',
        required: true,
    },
    country: {
        type: 'string',
        required: true,
    },
    schoolName: {
        type: 'string',
        required: true,
    },
    currentIn: {
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
    abcNo: {
        type:'string',
        required: false,
    },
    ResearchGuide: {
        type:'string',
        required: false,
    }, 
    Title: {
        type:'string',
        required: false,
    },
    dateOfRac: {
        type:'string',
        required: false,
    }, 
    ReceivesFelloship: {
        type:'string',
        required: false,
    },
    ResearchGuideId: {
        type:'string',
        required: false,
    },
})

const StudentUser = new mongoose.model('StudentUser', studentUserSchema);

module.exports = StudentUser;