const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    lendingInstitute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    aspirantInstitute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    note: {
        type: String
    },
    reqType: {
        type: String,
        enum: ['prior', 'standard'],
        default: 'standard'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'signed', 'approved', 'cancelled', 'completed'],
        default: 'pending'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Request = new mongoose.model("Request", RequestSchema);
module.exports = Request;