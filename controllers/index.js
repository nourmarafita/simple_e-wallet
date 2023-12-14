const { Balance, User } = require("../models");

class Controller {
  static async addBalance(req, res, next) {
    try {
      const { amount } = req.body;
      const { username } = req.user;

      const checkUser = await User.findOne({
        where: { username: username },
      })

      if (!checkUser) {
        throw { name: "UserNotFound" };
      }

      if (amount > 10000000) {
        throw { name: "InvalidTopUpAmount" };  
      }

      const checkData = await Balance.findOne({
        where: { username: username },
      });

      let data
      if (!checkData) {
        data = await Balance.create({
          balance: +amount,
          username: username,
        });
      } else {
        data = await Balance.update({
          balance: +amount + checkData.balance,
          username: username,
        }, {
          where: {
            username: username,
          },
        });
      }

      if (!data) {
        throw { name: "InvalidTopUpAmount" };
      }
      
      res.status(200).json({
        statusCode: 200,
        statusMessage: "RESPONSE OK",
        statusDescription:"No Content",
        result: {
            errorCode: "00",
            errorMessage:"Success",
            data: {
                balance: checkData ? +amount + checkData.balance : +amount,
                username: username
              },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async readBalance(req, res, next) {
    try {
      const { username } = req.user
      const data = await Balance.findOne({
        where: { username: username },
      });

      res.status(200).json({
        statusCode: 200,
        statusMessage: "OK",
        statusDescription: "Request succeeded without error",
        result: {
          errorCode: "00",
          errorMessage: "Success",
          data: {
            balance: data ? data.balance : 0,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async transferBalance(req, res, next) {
    try {
      const { amount, username: username1 } = req.body;
      const { username: username2 } = req.user;

      if (amount > 10000000) {
        throw { name: "InvalidTopUpAmount" };  
      }

      const checkUser = await User.findOne({
        where: { username: username1 },
      })

      if (!checkUser) {
        throw { name: "UserNotFound" };
      }

      const checkDataUser1 = await Balance.findOne({
        where: { username: username2 },
      });

      if (!checkDataUser1) {
        throw { name: "BadRequest" };  
      }

      if (checkDataUser1.balance <= amount) {
        throw { name: "InsufficientBalance" }
      }

      const checkDataUser2 = await Balance.findOne({
        where: { username: username1 },
      });

      let data
      if (!checkDataUser2) {
        data = await Balance.create({
          balance: +amount,
          username: username1,
        });
      } else {
        data = await Balance.update({
          balance: +amount + checkDataUser2.balance,
          username: username1,
        }, {
          where: {
            username: username1,
          },
        });
      }

      if (!data) {
        throw { name: "InvalidTopUpAmount" };
      } else {
        data = await Balance.update({
          balance: checkDataUser1.balance - parseInt(amount),
          username: username2,
        }, {
          where: {
            username: username2,
          },
        });
      }

      res.status(200).json({
        statusCode: 200,
        statusMessage: "RESPONSE OK",
        statusDescription:"No Content",
        result: {
            errorCode: "00",
            errorMessage:"Success",
            data: {
                balance: checkDataUser2 ? +amount + checkDataUser2.balance : +amount,
                username: username1
              },
        },
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Controller