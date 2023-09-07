const mongoose = require('mongoose');

const dsdUserSchema = new mongoose.Schema({

    dName: {
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
    password: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('dsdUser', dsdUserSchema);