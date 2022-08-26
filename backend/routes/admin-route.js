const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const restrictTo = require('../middlewares/restrictTo')
const adminController = require('../controller/adminController')

router
    .route('/login')
    .post(checkAuth, adminController.loginAdmin)

router
    .route('/stats')
    .get(checkAuth, adminController.getStats)

router
    .route('/institutes')
    .get(checkAuth, adminController.getAllInstitutes)

router
    .route('/requirement')
    .get(checkAuth, adminController.getAllRequirements)

router
    .route('/request')
    .get(checkAuth, adminController.getAllRequests)

router
    .route('/resource')
    .get(checkAuth, adminController.getAllResources)

router
    .route('/coupon')
    .post(checkAuth, adminController.addCoupon)
    .get(checkAuth, adminController.getCoupon)

module.exports = router