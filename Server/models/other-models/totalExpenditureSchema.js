const mongoose = require('mongoose');

const totalExpenditureSchema = new mongoose.Schema({
    budjetAllocated: {
        type: 'string',
        required: false,
    },
    expenditureInfrastructure: {
        type: 'string',
        required: false,
    },
    totalExpenditure: {
        type: 'string',
        required: false,
    },
    academicMaintenance: {
        type: 'string',
        required: false,
    },
    physicalMaintenance: {
        type: 'string',
        required: false,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    Proof: {
        type: 'string',
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('TotalExpenditure', totalExpenditureSchema);