const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requestController = require('../controller/requestController');
const checkVerification = require('../middlewares/checkVerification');

router
    .route('/')
    .get(checkAuth, checkVerification, requestController.getAllRequest)
    .post(checkAuth, checkVerification, requestController.createRequest)

router
    .route('/recieved')
    .get(checkAuth, checkVerification, requestController.getRecievedRequest)

router
    .route('/verify-signature')
    .post(checkAuth, checkVerification, requestController.checkSignature)

router
    .route('/:id')
    .get(checkAuth, checkVerification, requestController.getRequest)
    .patch(checkAuth, checkVerification, requestController.updateRequest)

router.route('/exists/:id')
    .get(checkAuth, checkVerification, requestController.requestExists);

module.exports = router;