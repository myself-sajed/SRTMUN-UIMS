const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    name: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    photoURL: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('swayamUser', schema);