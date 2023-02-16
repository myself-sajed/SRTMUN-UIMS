const mongoose = require('mongoose');

const reservedSeatsSchema = new mongoose.Schema({
    Academic_Year: {
        type: String,
        required: false
    },
    Activity: {
        type: String,
        required: false
    },
    SC: {
        type: Number,
        required: true
    },
    ST: {
        type: Number,
        required: true
    },
    OBC: {
        type: Number,
        required: true
    },
    Divyngjan: {
        type: Number,
        required: true
    },
    General: {
        type: Number,
        required: true
    },
    Others: {
        type: Number,
        required: true
    },
    Upload_Proof: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: true
    }

})

const ReservedSeats = new mongoose.model('ReservedSeat', reservedSeatsSchema);

module.exports = ReservedSeats;