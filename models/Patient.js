const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    speciality: {
        type: String
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    },
    doctor: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    nationality: {
        type: String
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);
