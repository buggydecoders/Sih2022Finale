const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    startDate:{
        type:String,
    },
    endDate:{
        type:String,
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
})

const Request = new mongoose.model("Request", RequestSchema);
module.exports = Request;