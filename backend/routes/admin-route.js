const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const restrictTo = require('../middlewares/restrictTo')
const adminController = require('../controller/adminController')

router
    .route('/institutes')
    .get(checkAuth, restrictTo('admin'), adminController.getAllInstitutes)

router
    .route('/stats')
    .get(checkAuth, restrictTo('admin'), adminController.getStats)

router
    .route('/requirements')
    .get(checkAuth, restrictTo('admin'), adminController.getRequirements)

module.exports = router