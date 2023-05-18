module.exports = (sequelize, Sequelize) => {
  const AttendanceLog = sequelize.define("AttendanceLog", {
    checkIn: Sequelize.DATE,
    checkOut: Sequelize.DATE,
  });
  return AttendanceLog;
};
