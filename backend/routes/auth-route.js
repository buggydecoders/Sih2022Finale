const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const authController = require('../controller/authController')

router
    .route("/login")
    .post(authController.loginUser)

// router
//     .route("/script")
//     .get(authController.usernameScript)

router
    .route("/create-user")
    .post(authController.createUser)

router
    .route("/logout")
    .get(checkAuth, authController.logoutUser)

router
    .route("/update-user")
    .patch(checkAuth, authController.updateUser)

router
    .route('/get-institutes')
    .get(checkAuth, authController.getAllInstitutes)

router
    .route("/remove-user/:id")
    .delete(checkAuth, authController.removeUser)

router
    .route("/verify-user")
    .post(checkAuth, authController.setVerification)

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