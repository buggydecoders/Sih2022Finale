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
    ipfsURI: {
        type: String
    },
    accessToken : {
        type : String,
    },
    accessType : {
        type : String
    },
    accessKeys : [{
        type : String
    }],
    isExpired : {
        type : Boolean,
        default : false
    },
    isMinted: {
        type: Boolean,
        default: false
    },
    accessKeys: {
        type: String
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
    }
}, {
    timestamps: true
})

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;