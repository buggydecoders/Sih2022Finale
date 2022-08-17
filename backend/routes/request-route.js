const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requestController = require('../controller/requestController')

router
    .route('/')
    .get(checkAuth, requestController.getAllRequest)
    
router
    .route('/:id')
    .get(checkAuth, requestController.getRequest)
    .post(checkAuth, requestController.createRequest)

module.exports = router;