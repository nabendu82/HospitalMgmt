const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: [String],
        enum: ["Agent", "Operation", "Admin"]
    },
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
