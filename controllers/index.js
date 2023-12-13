const { Balance, User } = require("../models");

class Controller {
  static async addBalance(req, res, next) {
    try {
      const { balance } = req.body;
      const { id: UserId } = req.user;

      const data = await Balance.create({
        balance,
        UserId: +UserId,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Balance created successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readBalance(req, res, next) {
    try {
      const data = await Balance.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          }
        ],
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Controller