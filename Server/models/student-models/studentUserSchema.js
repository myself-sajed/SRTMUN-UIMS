const mongoose = require('mongoose');

const studentUserSchema = new mongoose.Schema({

    isAlumni: {
        type: 'boolean',
        required: false,
    },
    isActiveStudent: {
        type: 'boolean',
        required: false,
    },
    salutation: {
        type: 'string',
        required: false,
    },
    photoURL: {
        type: 'string',
        required: false,
    },
    name: {
        type: 'string',
        required: false,
    },
    email: {
        type: 'string',
        required: false,
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
        required: false,
    },
    programGraduated: {
        type: 'string',
        required: false,
    },
    programEnroledOn: {
        type: 'string',
        required: false,
    },
    cast: {
        type: 'string',
        required: false,
    },
    religion: {
        type: 'string',
        required: false,
    },
    country: {
        type: 'string',
        required: false,
    },
    eligibility: {
        type: 'string',
        required: false,
    },
    schoolName: {
        type: 'string',
        required: false,
    },
    currentIn: {
        type: 'string',
        required: false,
    },
    gender: {
        type: 'string',
        required: false,
    },
    password: {
        type: 'string',
        required: false
    },
    abcNo: {
        type: 'string',
        required: false,
    },
    doCompletion: {
        type: 'string',
        required: false,
    },
    alumniProof: {
        type: 'string',
        required: false,
    },
    ResearchGuide: {
        type: 'string',
        required: false,
    },
    Title: {
        type: 'string',
        required: false,
    },
    dateOfRac: {
        type: 'string',
        required: false,
    },
    ReceivesFelloship: {
        type: 'string',
        required: false,
    },
    ResearchGuideId: {
        type: 'string',
        required: false,
    },
    isCreatedByDirector: {
        type: 'boolean',
        required: false,
        default: false,
    },

})

const StudentUser = new mongoose.model('StudentUser', studentUserSchema);

module.exports = StudentUser;































// const mongoose = require('mongoose');

// const studentUserSchema = new mongoose.Schema({

//     isAlumni: {
//         type: 'boolean',
//         required: true,
//     },
//     isActiveStudent: {
//         type: 'string',
//         required: true,
//     },
//     salutation: {
//         type: 'string',
//         required: true,
//     },
//     photoURL: {
//         type: 'string',
//         required: true,
//     },
//     name: {
//         type: 'string',
//         required: true,
//     },
//     email: {
//         type: 'string',
//         required: true,
//     },

//     address: {
//         type: 'string',
//         required: false,
//     },
//     dob: {
//         type: 'string',
//         required: false,
//     },
//     mobile: {
//         type: 'string',
//         required: true,
//     },
//     programGraduated: {
//         type: 'string',
//         required: true,
//     },
//     programEnroledOn: {
//         type: 'string',
//         required: true,
//     },
//     cast: {
//         type: 'string',
//         required: true,
//     },
//     religion: {
//         type: 'string',
//         required: true,
//     },
//     country: {
//         type: 'string',
//         required: true,
//     },
//     eligibility: {
//         type: 'string',
//         required: false,
//     },
//     schoolName: {
//         type: 'string',
//         required: true,
//     },
//     currentIn: {
//         type: 'string',
//         required: true,
//     },
//     gender: {
//         type: 'string',
//         required: true,
//     },
//     password: {
//         type: 'string',
//         required: true
//     },
//     abcNo: {
//         type: 'string',
//         required: false,
//     },
//     ResearchGuide: {
//         type: 'string',
//         required: false,
//     },
//     Title: {
//         type: 'string',
//         required: false,
//     },
//     dateOfRac: {
//         type: 'string',
//         required: false,
//     },
//     ReceivesFelloship: {
//         type: 'string',
//         required: false,
//     },
//     ResearchGuideId: {
//         type: 'string',
//         required: false,
//     },
//     createdBy: {
//         type: 'string',
//         required: true,
//     },

// })

// const StudentUser = new mongoose.model('StudentUser', studentUserSchema);

// module.exports = StudentUser;