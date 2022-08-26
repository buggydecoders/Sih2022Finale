const router = require('express').Router()
const facultyController = require('../controller/facultyController')

router
    .route('/sign-up')
    .post(facultyController.signupFaculty)

router
    .route('/login')
    .post(facultyController.loginUser)

module.exports = router