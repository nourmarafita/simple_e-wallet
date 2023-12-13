const { User } = require("../models");
const { convertPayloadToToken, generateRefreshToken } = require("../helpers/token");

class UserController {
  static async register(req, res, next) {
    try {
      const { username } =
        req.body;

      const createdUser = await User.create({
        username,
      });

      if (!createdUser) {
        throw { name: "RegistrationFailed" };
      }

      const payload = {
        id: createdUser.id,
      };

      const access_token = convertPayloadToToken(payload);

      res.status(201).json({
        statusCode: 201,
        statusMessage: "Created",
        statusDescription:"Resource created",
        result: {
            errorCode: "00",
            errorMessage:"Success",
            data: {
                accessToken: access_token,
                accessTokenExpiresAt: new Date(Date.now() + 6400 * 1000).toISOString(),
                accessTokenExpiresIn: 6400,
                refreshToken: generateRefreshToken(payload),
                refreshTokenExpiresAt: new Date(Date.now() + 432000 * 1000).toISOString(),
                refreshTokenExpiresIn: 432000,
              },
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;