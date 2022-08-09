const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const userController = require('../controller/userController');
const restrictTo = require('../middlewares/restrictTo');
const authController = require('../controller/authController')

router
    .route("/login")
    .post(userController.loginUser)

router
    .route("/createUser")
    .post(userController.createUser)

router
    .route("/logout")
    .get(checkAuth, userController.logoutUser)

router
    .route("/updateUser/:id")
    .patch(checkAuth, userController.updateUser)

router
    .route("/removeUser/:id")
    .delete(checkAuth, restrictTo('admin'), userController.removeUser)

router
    .route("/getUser")
    .get(checkAuth, userController.getUser)

router
    .route('/forgotPassword')
    .post(authController.forgotPassword)

router
    .route('/resetPassword')
    .post(authController.resetPassword)

module.exports = router