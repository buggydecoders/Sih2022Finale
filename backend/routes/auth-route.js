const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const authController = require('../controller/authController')

router
    .route("/login")
    .post(authController.loginUser)

router
    .route("/createUser")
    .post(authController.createUser)

router
    .route("/logout")
    .get(checkAuth, authController.logoutUser)

router
    .route("/updateUser/:id")
    .patch(checkAuth, authController.updateUser)

router
    .route("/removeUser/:id")
    .delete(checkAuth, restrictTo('admin'), authController.removeUser)

router
    .route("/getUser")
    .get(checkAuth, authController.getUser)

router
    .route('/forgotPassword')
    .post(authController.forgotPassword)

router
    .route('/resetPassword')
    .post(authController.resetPassword)

module.exports = router