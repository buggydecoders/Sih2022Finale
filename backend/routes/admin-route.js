const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const restrictTo = require('../middlewares/restrictTo')
const adminController = require('../controller/adminController')

router
    .route('/stats')
    .get(checkAuth, restrictTo('admin'), adminController.getStats)

router
    .route('/institutes')
    .get(checkAuth, restrictTo('admin'), adminController.getAllInstitutes)

router
    .route('/requirement')
    .get(checkAuth, restrictTo('admin'), adminController.getAllRequirements)

router
    .route('/request')
    .get(checkAuth, restrictTo('admin'), adminController.getAllRequests)

router
    .route('/resource')
    .get(checkAuth, restrictTo('admin'), adminController.getAllResources)


module.exports = router