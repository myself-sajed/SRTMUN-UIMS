const mongoose = require('mongoose');

  const tpoProgrationToHESchema = new mongoose.Schema({
      Name_of_student_enrolling: {
          type: String,
          required: true
      },
      SchoolName: {
          type: String,
          required: true
      },
      Program_graduated_from: {
          type: String,
          required: true
      },
      Name_of_institution_admitted: {
          type: String,
          required: true
      },
      Name_of_programme_admitted: {
          type: String,
          required: true
      },
      academicYear: {
          type: String,
          required: true
      },
      proof: {
          type: String,
          required: false
      },
  },{timestamps: true})
  
  module.exports = mongoose.model('tpoProgrationToHE', tpoProgrationToHESchema);