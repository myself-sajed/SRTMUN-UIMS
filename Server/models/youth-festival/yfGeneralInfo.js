const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    academicYear: {
        type: 'string',
        required: true,
    },
    info: {
        type: 'string',
        required: true,
    }
})

module.exports = new mongoose.model('yfGeneralInfo', schema);