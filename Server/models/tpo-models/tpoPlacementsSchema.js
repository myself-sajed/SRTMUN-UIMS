const mongoose = require('mongoose');

const tpoPlacementsSchema = new mongoose.Schema({
    Name_of_student_placed: {
        type: String,
        required: true
    },
    Program_graduated_from: {
        type: String,
        required: false
    },
    Name_of_the_employer: {
        type: String,
        required: true
    },
    Employer_contact_details: {
        type: String,
        required: true
    },
    Pay_package_annum: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: false
    },
    proof: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    },
    Type_Of_Placement: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('tpoPlacement', tpoPlacementsSchema);