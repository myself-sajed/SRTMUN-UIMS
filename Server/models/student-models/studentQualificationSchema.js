const mongoose = require('mongoose');

const studentQualificationSchema = new mongoose.Schema({
    Exam: {
        type: 'string',
        required: true,
    },
    InstitutionBoard: {
        type: 'string',
        required: true,
    },
    Persentage: {
        type: 'number',
        required: true,
    },
    StartYear: {
        type: 'string',
        required: true,
    },
    Year: {
        type: 'string',
        required: true,
    },
    Type: {
        type: 'string',
        required: true,
    },
    Upload_Proof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "studentusers"
    },
})

const StudentQualification = new mongoose.model('StudentQualification', studentQualificationSchema);

module.exports = StudentQualification;