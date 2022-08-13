const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const authController = require('../controller/authController')

router
    .route("/login")
    .post(authController.loginUser)

router
    .route("/create-user")
    .post(authController.createUser)

router
    .route("/logout")
    .get(checkAuth, authController.logoutUser)

router
    .route("/update-user/:id")
    .patch(checkAuth, authController.updateUser)

router
    .route("/remove-user/:id")
    .delete(checkAuth, restrictTo('admin'), authController.removeUser)

router
    .route("/get-user")
    .get(checkAuth, authController.getUser)

router
    .route('/forgot-password')
    .post(authController.forgotPassword)

router
    .route('/reset-password')
    .post(authController.resetPassword)

module.exports = router