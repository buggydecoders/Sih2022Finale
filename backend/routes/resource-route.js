const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const resourceController = require('../controller/resourceController');
const { patch } = require('./auth-route');

router
    .route('/')
    .post(checkAuth, resourceController.addResource)
    .get(checkAuth, resourceController.getResource)

router
    .route('/:id')
    .get(checkAuth, resourceController.getResourceDetails)
    .patch(checkAuth, resourceController.updateResource)
    .delete(checkAuth, resourceController.removeResource)

router
    .route('/save-resource/:id')
    .post(checkAuth, resourceController.saveResource)
    .delete(checkAuth, resourceController.removeSavedResource)

module.exports = router;