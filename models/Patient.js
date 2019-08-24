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
        type: String
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
    },
    patientstatus: {
        type: String,
        enum: ["Submitted", "RefHospital", "HospAccepted", "HospRejected", "OPUnderTreat", "OPTreatDone", "IPUnderTreat", "IPTreatDone", "Discharged", "PtInProgess", "ClaimNow", "PointsRedeemed"]
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);
