const router = require('express').Router()
const facultyController = require('../controller/facultyController')

router
    .route('/sign-up')
    .post(facultyController.signupFaculty)

router
    .route('/login')
    .post(facultyController.loginUser)

router
    .route('/requirement')
    .post(checkAuth, facultyController.addRequirement)
    .get(checkAuth, facultyController.getRequirements)
    
module.exports = router