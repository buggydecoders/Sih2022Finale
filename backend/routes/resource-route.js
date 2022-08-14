const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth');
const restrictTo = require('../middlewares/restrictTo');
const resourceController = require('../controller/resourceController')
const upload = require('../middlewares/multer')

router
    .route('/')
    .post(checkAuth, upload.single('image'), resourceController.addResource)
    .get(checkAuth, resourceController.getResource)

router
    .route('/save-resource/:id')
    .post(checkAuth, resourceController.saveResource)
    .delete(checkAuth, resourceController.removeSavedResource)

module.exports = router;