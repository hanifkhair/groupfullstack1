const db = require("../models");

const AttendanceLogController = {
  getAll: async (req, res) => {
    const AttendanceLog = await db.AttendanceLog.findAll();
    console.log(AttendanceLog);
    return res.send(AttendanceLog);
  },
  getById: async (req, res) => {
    const AttendanceLog = await db.AttendanceLog.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(AttendanceLog);
  },
  getTheId: async (req, res) => {
    try {
      console.log(req.params);
      // const result = await db.sequelize.query(
      //   `SELECT * FROM AttendanceLogs WHERE user_id = ${req.params.id} ORDER BY id DESC LIMIT 1`
      // );
      const result = await db.AttendanceLog.findOne({
        attributes: ["id"],
        where: {
          user_id: req.params.id,
        },
        order: db.sequelize.literal("id DESC"),
      });
      console.log(result);
      return res.send(result);
    } catch (error) {
      console.error("Error executing raw query:", error);
      return res.send(error);
    }
  },

  insertAttendanceLog: async (req, res) => {
    try {
      const { checkIn, checkOut, user_id } = req.body;
      await db.AttendanceLog.create({
        checkIn,
        checkOut,
        user_id,
      });
      return await db.AttendanceLog.findAll().then((result) => {
        res.send({
          msg: `new AttendanceLog added`,
          data: result,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  editAttendanceLog: async (req, res) => {
    try {
      const { checkOut } = req.body;
      await db.AttendanceLog.update(
        {
          checkOut,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.AttendanceLog.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been updated`,
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  deleteAttendanceLog: async (req, res) => {
    try {
      await db.AttendanceLog.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.AttendanceLog.findAll().then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been removed`,
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
};

module.exports = AttendanceLogController;
