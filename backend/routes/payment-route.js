const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const paymentController = require('../controller/paymentController')

router
    .route('/razorpay')
    .get(checkAuth, paymentController.payment)

router
    .route('/verify')
    .get(checkAuth, paymentController.verify)

module.exports = router