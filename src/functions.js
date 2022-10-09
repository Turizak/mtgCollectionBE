const axios = require("axios");
const bcrypt = require("bcrypt")

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

  return newData
};

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(15)
  const pass = await bcrypt.hash(password, salt)
  return pass
}

module.exports = {
  updateAllPrices,
  generatePassword
};
