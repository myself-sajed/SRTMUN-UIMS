const mongoose = require('mongoose');

const subscriptionForKRCSchema = new mongoose.Schema({
 
    libraryResources: {
        type: 'string',
        required: true,
    },
    eBooks: {
        type: 'string',
        required: true,
    },
    eResources: {
        type: 'string',
        required: true,
    },
    academicYear: {
        type: 'string',
        required: true,
    },
    Proof: {
        type: 'string',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('SubscriptionForKRC', subscriptionForKRCSchema);