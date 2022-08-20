const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requirementController = require('../controller/requirementController')

router
    .route('/')
    .get(checkAuth, requirementController.getRequirements)
    .post(checkAuth, requirementController.createRequirement)

router
    .route('/:id')
    .patch(checkAuth, requirementController.updateRequirement)
    .delete(checkAuth, requirementController.deleteRequirement)

module.exports = router