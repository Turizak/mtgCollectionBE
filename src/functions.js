const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require('moment')

const updateAllPrices = async (account_id) => {
  const cards = await axios
    .get(`http://localhost:3000/api/v1/account/${account_id}/cards`)
    .then((response) => response.data);

  for (let card of cards) {
    const scryData = await axios
      .get(`https://api.scryfall.com/cards/${card.scry_id}`)
      .then((response) => response.data);

    await axios.patch(
      `http://localhost:3000/api/v1/account/${account_id}/cards/${card.scry_id}`,
      {
        price: scryData.prices.usd,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  }

  const newData = await axios
    .get(`http://localhost:3000/api/v1/account/${account_id}/cards`)
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
    last_name: account.last_name
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
};

module.exports = {
  updateAllPrices,
  generatePassword,
  generateJWT,
};
