const mongoose = require('mongoose');

const researchProjectSchema = new mongoose.Schema({
    schemeName: {
        type: 'string',
        required: true,
    },
    programTitle: {
        type: 'string',
        required: false,
    },
    principalName: {
        type: 'string',
        required: true,
    },
    coInvestigator: {
        type: 'string',
        required: false,
    },
    isCo: {
        type: 'boolean',
        required: false,
    },
    durationYears: {
        type: [{ type: String }],
        require: false,
        default: [],
    },
    active: {
        type: 'boolean',
        required: false,
    },
    fundingName: {
        type: 'string',
        required: true,
    },
    isGov: {
        type: 'string',
        required: true,
    },
    department: {
        type: 'string',
        required: false,
    },
    awardYear: {
        type: 'string',
        required: true,
    },
    providedFunds: {
        type: 'string',
        required: true,
    },
    fundType: {
        type: 'string',
        required: true,
    },
    status: {
        type: 'string',
        required: true,
    },
    duration: {
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

module.exports = mongoose.model('researchProject', researchProjectSchema);