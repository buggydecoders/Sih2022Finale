const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema({
    title: {
        type: String
    },
    terms: {
        type: String
    },
    validTill: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Contract = mongoose.model("Contract", ContractSchema)
module.exports = Contract