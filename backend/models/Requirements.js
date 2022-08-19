const mongoose = require('mongoose')

const RequirementSchema = mongoose.Schema({
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
    },
    aspirantInstitute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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

const Requirement = new mongoose.model("Requirement", RequirementSchema)