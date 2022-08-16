const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
    images: [{
        name: String,
        url: String,
        size: String
    }],
    name: {
        type: String
    },
    price: {
        type: String
    },
    durationFrom: {
        type: String
    },
    durationTo: {
        type: String
    },
    per:{
        type:String
    },
    category: {
        type: String
    },
    brief: {
        type: String
    },
    description: {
        type: String
    },
    conditions: {
        type: String
    },
    instructions: {
        type: String
    },
    state: {
        type: String,
        enum: ['shared', 'available', 'draft'],
        default: "available"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVacant: {
        type: Boolean,
        default: true
    },
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;