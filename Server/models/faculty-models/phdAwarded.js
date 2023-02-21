const mongoose = require('mongoose');

const phdAwardedSchema = new mongoose.Schema({

    scholarName: {
        type: 'string',
        required: true,
    },
    departmentName: {
        type: 'string',
        required: true,
    },
    guideName: {
        type: 'string',
        required: true,
    },
    degreeName: {
        type: 'string',
        required: true,
    },
    awardSubmit: {
        type: 'string',
        required: true,
    },
    thesisTitle: {
        type: 'string',
        required: true,
    },
    yearOfScholar: {
        type: 'string',
        required: true,
    },
    rac: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    phdAwardYear: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'string',
        required: true,
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

module.exports = mongoose.model('phdAwarded', phdAwardedSchema);