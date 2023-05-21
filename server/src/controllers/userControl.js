const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const moment = require("moment");
const private_key = process.env.private_key;

const userController = {
  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll();
      console.log(user);
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  getLogin: async (req, res) => {
    try {
      const { emna, password } = req.query;
      const user = await db.User.findOne({
        where: { [db.Sequelize.Op.or]: [{ name: emna }, { email: emna }] },
      });
      console.log(user);
      if (user) {
        const watch = await bcrypt.compare(password, user.dataValues.password);
        const token = jwt.sign(user.dataValues, private_key, {
          expiresIn: "1h",
        });

        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          return res.send({ message: "login berhasil", value: user, token });
        } else {
          throw new Error("login Gagal");
        }
      } else {
        return res.send({ message: "login gagal" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
  getLoginv2: async (req, res) => {
    try {
      const { emna, password } = req.query;
      const user = await db.User.findOne({
        where: { [db.Sequelize.Op.or]: [{ name: emna }, { email: emna }] },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const generateToken = nanoid();
          console.log(nanoid());
          const token = db.Token.create({
            expired: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
          });
          return res.send({ message: "login berhasil", value: user, token });
        } else {
          throw new Error("login gagal");
        }
      } else {
        return res.send({ message: "login gagal" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },

  getByToken: async (req, res) => {
    const { token } = req.query;
    let user = jwt.verify(token, private_key);

    user = await db.User.findOne({
      where: {
        id: user.id,
      },
    });
    delete user.dataValues.password;
    res.send(user);
  },
  // getByTokenv2: async (req, res) => {
  //   const { token } = req.query;
  //   let user = jwt.verify(token, private_key);

  //   user = await db.User.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  //   delete user.dataValues.password;
  //   res.send(user);
  // },

  getById: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  insertUser: async (req, res) => {
    try {
      const { name, address, email, password, company_id } = req.body;

      // const salt = bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      await db.User.create({
        name,
        address,
        email,
        password: hashPassword,
        company_id,
      });
      // return await db.User.findAll().then((result) => {
      //   res.send(result);
      // });
      return res.send({
        message: "register berhasil",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const { name, address, email, password, company_id } = req.body;
      await db.User.update(
        {
          name,
          address,
          email,
          password,
          company_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.User.findOne({
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
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.User.findAll().then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been removed`,
          data: result,
        })
      );
    } catch (err) {}
  },
};

module.exports = userController;
