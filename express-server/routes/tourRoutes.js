const express = require("express");
const tourController = require("../controllers/tourController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

router.get("/user", userController.getAllUser);
router.post("/user", userController.create);
router.get("/user/:id", userController.getSingleUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
module.exports = router;
