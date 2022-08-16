const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const resourceController = require('../controller/resourceController');

router
    .route('/')
    .post(checkAuth, resourceController.addResource)
    .get(checkAuth, resourceController.getMyResource)

router
    .route('/dashboard')
    .get(checkAuth, resourceController.recommendedResources)

router
    .route('/search')
    .post(checkAuth, resourceController.searchResource)

router
    .route('/:id')
    .get(checkAuth, resourceController.getResourceDetails)
    .patch(checkAuth, resourceController.updateResource)
    .delete(checkAuth, resourceController.removeResource)

router
    .route('/feedback')
    .post(checkAuth, resourceController.getFeedback)

router
    .route('/save-resource/:id')
    .post(checkAuth, resourceController.saveResource)
    .delete(checkAuth, resourceController.removeSavedResource)

module.exports = router;