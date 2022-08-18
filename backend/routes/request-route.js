const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requestController = require('../controller/requestController')

router
    .route('/')
    .get(checkAuth, requestController.getAllRequest)
    .post(checkAuth, requestController.createRequest)

router
    .route('/recieved')
    .get(checkAuth,requestController.getRecievedRequest)

router
    .route('/:id')
    .get(checkAuth, requestController.getRequest)
    .patch(checkAuth, requestController.updateRequest)

router.route('/exists/:id').get(checkAuth,requestController.requestExists);

module.exports = router;