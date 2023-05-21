module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define(
    "Tokens",
    {
      token: {
        type: Sequelize.STRING,
      },
      expired: {
        type: Sequelize.DATE,
      },
      payload: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return token;
};
