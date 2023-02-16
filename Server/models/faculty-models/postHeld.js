const mongoose = require('mongoose');

const postHeldSchema = new mongoose.Schema({
    designation: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: true,
    },
    joiningDate: {
        type: 'string',
        required: true,
    },
    leavingDate: {
        type: 'string',
        required: false,
    },
    proof: {
        type: 'string',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }

}, { timestamps: true });

module.exports = mongoose.model('postHeld', postHeldSchema);