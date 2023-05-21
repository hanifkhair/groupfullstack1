const express = require("express");
const router = express.Router();

const attendanceLogController =
  require("../controllers").AttendanceLogController;

//get
router.get("/", attendanceLogController.getAll);
router.get("/check/:id", attendanceLogController.getTheId);
router.get("/:id", attendanceLogController.getById);

//insert
router.post("/", attendanceLogController.insertAttendanceLog);

//update
router.patch("/:id", attendanceLogController.editAttendanceLog);

//delete
router.delete("/:id", attendanceLogController.deleteAttendanceLog);

module.exports = router;
