const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
});

module.exports = Hospital = mongoose.model('hospital', HospitalSchema);
