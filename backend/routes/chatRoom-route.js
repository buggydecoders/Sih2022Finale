const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");
const roomController = require("../controller/roomController");

router
  .route("/")
  .post(checkAuth, roomController.fetchRoom)
  .get(checkAuth, roomController.fetchRooms);

router.route("/:id").get(checkAuth, roomController.fetchMessagesByRoom);

module.exports = router;
