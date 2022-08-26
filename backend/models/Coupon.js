const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    },
    discount: {
        type: Number
    },
    code: {
        type: String
    }
})

const Coupon = mongoose.model("Coupon", couponSchema)
module.exports = Coupon