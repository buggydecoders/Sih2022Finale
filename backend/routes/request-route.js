const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requestController = require('../controller/requestController');
const checkVerification = require('../middlewares/checkVerification');

router
    .route('/')
    .get(checkAuth, requestController.getAllRequest)
    .post(checkAuth, checkVerification, requestController.createRequest)

router
    .route('/recieved')
    .get(checkAuth, checkVerification, requestController.getRecievedRequest)

router
    .route('/verify-signature')
    .post(checkAuth, checkVerification, requestController.checkSignature)

router.route('/verify-token').post(checkAuth,checkVerification,requestController.verifyRequestToken)

router
    .route('/check-verification')
    .post(requestController.checkAccessKey)
    
router
    .route('/:id')
    .get(checkAuth, checkVerification, requestController.getRequest)
    .patch(checkAuth, checkVerification, requestController.updateRequest)

router.route('/exists/:id')
    .get(checkAuth, checkVerification, requestController.requestExists);

module.exports = router;