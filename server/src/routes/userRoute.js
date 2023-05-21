const express = require("express");
const router = express.Router();

const userController = require("../controllers").userController;

//get
router.get("/", userController.getAll);
router.get("/login", userController.getLogin);
router.get("/loginv2", userController.getLoginv2);
router.get("/token", userController.getByToken);
router.get("/:id", userController.getById);

//insert
router.post("/", userController.insertUser);

//update
router.patch("/:id", userController.editUser);

//delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
