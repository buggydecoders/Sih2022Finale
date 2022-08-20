const mongoose = require('mongoose')

const RequirementSchema = new mongoose.Schema({
    aspirantInstitute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    budget: {
        type: String
    },
    durationFrom: {
        type: String
    },
    durationTo: {
        type: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Requirement = mongoose.model("Requirement", RequirementSchema)
module.exports = Requirement