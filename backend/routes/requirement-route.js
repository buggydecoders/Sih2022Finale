const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requirementController = require('../controller/requirementController')

router
    .route('/')
    .get(checkAuth, requirementController.getRequirements)
    .post(checkAuth, requirementController.createRequirement)

module.exports = router