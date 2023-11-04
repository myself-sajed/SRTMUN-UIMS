const mongoose = require('mongoose');

const tpoCounselingAndGuidanceSchema = new mongoose.Schema({
    Name_of_the_Activity_conducted_by_the_HEI: {
        type: String,
        required: true
    },
    Number_of_Students_Attended: {
        type: Number,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    Year_of_Activity: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: false
    },
},{timestamps: true})

module.exports = mongoose.model('tpoCounselingAndGuidance', tpoCounselingAndGuidanceSchema);