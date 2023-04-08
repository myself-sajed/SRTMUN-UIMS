const mongoose = require('mongoose');

const studentIdCountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idObject: {
    type: Object,
    required: true
  }
});

const studentIdCount = mongoose.model('studentIdCount', studentIdCountSchema);

module.exports = studentIdCount;