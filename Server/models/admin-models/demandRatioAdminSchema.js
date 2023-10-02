const mongoose = require('mongoose');
const demandRatioAdminSchema = new mongoose.Schema({
    programmeCode: {
        type: String,
        required: true
    },
    programmeName: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: false
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
    eligibleApplications: {
        type: Number,
        required: true
    },
    studentsAdmitted: {
        type: Number,
        required: true
    },
    programType: {
        type: String,
        required: false
    },
    proof:{
        type: String,
        required: false
    },
    schoolName: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('DemandRatioAdmin', demandRatioAdminSchema);