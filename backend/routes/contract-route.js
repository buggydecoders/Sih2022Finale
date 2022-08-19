const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const contractController = require('../controller/contractController')

router
    .route('/')
    .get(checkAuth, contractController.getAllContract)
    .post(checkAuth, contractController.addContract)

router
    .route('/:id')
    .get(checkAuth, contractController.getContract)
    .patch(checkAuth, contractController.updateContract)
    .delete(checkAuth, contractController.deleteContract)

module.exports = router