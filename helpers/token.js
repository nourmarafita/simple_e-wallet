const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function convertPayloadToToken(data) {
    const expiresIn = 432000;
    return jwt.sign(data, secretKey, { expiresIn });
}

function generateRefreshToken(data) {
    const refreshTokenExpiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
    const refreshToken = jwt.sign(data, secretKey, { expiresIn: refreshTokenExpiresIn });
  
    return refreshToken;
  }

function verifyToken(data) {
  return jwt.verify(data, secretKey);
}

module.exports = { convertPayloadToToken, verifyToken, generateRefreshToken };