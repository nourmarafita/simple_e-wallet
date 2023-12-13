const errorHandler = ((err, req, res, next) => {
    let code = 500;
    let msg = "Internal Server Error";
    let desc = ""

    const { name } = err

    if (name === "SequelizeValidationError") {
      code = 400;
      msg = err.errors.map((el) => el.message);
    } else if (name === "SequelizeUniqueConstraintError") {
      code = 400;
      msg = err.errors.map((el) => el.message);
    } else if (name === "RegistrationFailed") {
      code = 400;
      msg = "Registration Failed";
    } else if (name === "UserNotFound") {
      code = 401;
      msg = "Unauthorized Access";
    } else if (name === "InvalidPassword") {
      code = 401;
      msg = "Invalid Password/Email";
    } else if (name === "InvalidToken" || name === "JsonWebTokenError") {
      code = 401;
      msg = "Access Token is Invalid";
    } else if (name === "BadRequest") {
      code = 400;
      msg = "Bad Request";
    } else if (name === "Forbidden") {
      code = 403;
      msg = "You Don't Have Access!";
    } else if (name === "Username already in use!") {
        code = 400;
        msg = "Bad Request"
        desc = "Request is invalid, missing parameters?"
    }

    res.status(code).json({
      statusCode: code,
      statusMessage: msg,
      statusDescription: desc
    });
})



module.exports = errorHandler