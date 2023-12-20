const mongoose = require('mongoose');

const developmentProgramNirfSchema = new mongoose.Schema({
    NoOfEDPMDP: {
        type: Number,
        required: true
    }, 
    participants: {
        type: Number,
        required: true
    }, 
    earnings: {
        type: Number,
        required: true
    }, 
    earningsInWords: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    }, 
},{timestamps:true});

module.exports = mongoose.model('developmentProgramNirf', developmentProgramNirfSchema)