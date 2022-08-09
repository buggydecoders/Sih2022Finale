const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requestController = require('../controller/requestController')

router
    .route('/')
    .post(checkAuth, requestController.createRequest)
    .get(checkAuth, requestController.getRequest)

module.exports = router;