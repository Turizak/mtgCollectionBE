const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(15);
  const pass = await bcrypt.hash(password, salt);
  return pass;
};

const generateJWT = (account) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: moment.now().valueOf(),
    account_id: account.account_id,
    first_name: account.first_name,
    last_name: account.last_name,
  };

  const token = jwt.sign(data, jwtSecretKey, {expiresIn: '2h'});
  return token;
};

const verifyJWT = async (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) return verified;
  else return null;
};

module.exports = {
  generatePassword,
  generateJWT,
  verifyJWT,
};
