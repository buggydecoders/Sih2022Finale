const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");
const resourceController = require("../controller/resourceController");

router
  .route("/")
  .post(checkAuth, resourceController.addResource)
  .get(checkAuth, resourceController.getMyResource);


router
  .route("/dashboard")
  .get(checkAuth, resourceController.fetchDashboardResources);

router
  .route("/search")
  .get(checkAuth, resourceController.SearchData);

router
  .route("/feedback/:id")
  .post(checkAuth, resourceController.getFeedback);



router
  .route("/:id")
  .get(checkAuth, resourceController.getResourceDetails)
  .patch(checkAuth, resourceController.updateResource)
  .delete(checkAuth, resourceController.removeResource);

router
  .route("/save/:id")
  .post(checkAuth, resourceController.addSavedItem)
  .delete(checkAuth, resourceController.deleteSavedItem);



module.exports = router;
