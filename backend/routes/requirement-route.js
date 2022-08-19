const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const requirementController = require('../controller/requirementController')

router
    .route('/')
    .get(checkAuth, requirementController.getAllRequirements)
    .post(checkAuth, requirementController.createRequirement)

router
    .route('/:id')
    .get(checkAuth, requirementController.getRequirement)
    .patch(checkAuth, requirementController.updateRequirement)
    .delete(checkAuth, requirementController.deleteRequirement)

module.exports = router