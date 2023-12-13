const { User } = require('../models')
const { verifyToken } = require("../helpers/token");

const getToken = (headerAuth) => {
    if (headerAuth && headerAuth.includes("Bearer")) {
      const parted = headerAuth.split(" ");
      if (parted.length === 2) {
        return parted[1];
      }
    }
    return undefined;
  };

async function authentication(req, res, next){
    try {
        const headerAuth = req.header("Authorization") || "";
        const access_token = getToken(headerAuth);

        if (!access_token) {
          throw { name: "InvalidToken" };
        }

        const payload = verifyToken(access_token);
        
        const { id } = payload

        const user = await User.findByPk(+id)

        if (!user){
            throw { name: "UserNotFound" };
        }
        
        req.user = {
            id: user.id,
            username: user.username
        }

        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}


module.exports = authentication;