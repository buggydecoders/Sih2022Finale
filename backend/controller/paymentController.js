const catchAsync = require("../utils/catchAsync");
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const Razorpay = require("razorpay")
const shortid = require("shortid")
const Request = require('../models/Request')
var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.payment = catchAsync(async (req, res) => {
    const payment_capture = 1;
    let request = await Request.findById(req.params.id).populate('resource')
    var amount = request.resource.price;

    const currency = "INR"
    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    const response = await razorpay.orders.create(options)
    request.orderId = response.id;

    await request.save()
    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    })
})

exports.verify = catchAsync(async (req, res) => {
    const secret = 'sihsecret'

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {
        const orderId = req.body.payload.payment.entity.order_id
        const contact = req.body.payload.payment.entity.contact
        var amount = Number(req.body.payload.payment.entity.amount)
        amount /= 100;
        const payment_id = req.body.payload.payment.entity.id
        const request = await Request.findOne({ orderId })
        request.isPaid = true;
        request.paymentId = payment_id;
        request.price = amount;
        const res = await request.save();
    }
    else {

    }
    res.json({ status: 'ok' })
})