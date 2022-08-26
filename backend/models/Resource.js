const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
    images: [{
        name: String,
        url: {
            type: String,
            default: "https://res.cloudinary.com/unesco-admin/image/upload/v1660719679/325-3256246_fa-fa-product-icon-transparent-cartoons-fa-fa_qlti2r.jpg"
        },
        size: String
    }],
    name: {
        type: String
    },
    price: {
        type: String
    },
    feedback: {
        type: String
    },
    durationFrom: {
        type: String
    },
    durationTo: {
        type: String
    },
    resourceURL : {
        type : String
    },
    resourceType : {
        type : String
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