const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const updateAllPrices = async (token) => {
  const headers = {
    "Content-type": "application/json",
    Authorization: `${token}`,
  };
  const cards = await axios
    .get(`http://localhost:3000/api/v1/account/cards`, {
      headers: headers,
    })
    .then((response) => response.data);

  for (let card of cards) {
    const scryData = await axios
      .get(`https://api.scryfall.com/cards/${card.scry_id}`)
      .then((response) => response.data);

    await axios.patch(
      `http://localhost:3000/api/v1/account/cards/${card.scry_id}`,
      {
        price: scryData.prices.usd,
      },
      {
        headers: headers,
      }
    );
  }

  const newData = await axios
    .get(`http://localhost:3000/api/v1/account/cards`, {
      headers: headers,
    })
    .then((response) => response.data);

  return newData;
};

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

  const token = jwt.sign(data, jwtSecretKey);
  return token;
};

const verifyJWT = async (token) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) return verified;
  else return null;
};

module.exports = {
  updateAllPrices,
  generatePassword,
  generateJWT,
  verifyJWT,
};
