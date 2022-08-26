const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
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
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    },
    isMinted: {
        type: Boolean,
        default: false
    },
    tokenId: {
        type: Number
    },
    tokenURI: {
        type: String
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
        enum: ['pending', 'accepted', 'await-sign', 'signed', 'approved', 'cancelled', 'completed'],
        default: 'pending'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    orderId: {
        type: String
    },
    paymentId: {
        type: String
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    price:{
        type:String
    }
}, {
    timestamps: true
})

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;