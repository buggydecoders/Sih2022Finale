const router = require('express').Router()
const facultyController = require('../controller/facultyController')
const checkAuth = require('../middlewares/checkAuth')
router
    .route('/sign-up')
    .post(facultyController.signupFaculty)

router
    .route('/login')
    .post(facultyController.loginUser)

router
    .route('/check-aadhar')
    .post(facultyController.checkAadhar)

router
    .route('/requirement')
    .post(checkAuth, facultyController.addRequirement)
    .get(checkAuth, facultyController.getRequirements)

module.exports = router