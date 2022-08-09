const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    duration: {
        type: String
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
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps: true
})

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;