const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const paymentController = require('../controller/paymentController')

// router
//     .route('/contact')
//     .post(checkAuth, paymentController.addContact)

// router
//     .route('/activate')
//     .post(checkAuth, paymentController.activateFundAccount)

// router
//     .route('/payout')
//     .post(checkAuth, paymentController.payouts)

module.exports = router