const axios = require("axios");

const updateAllPrices = async () => {
  const cards = await axios
    .get("http://localhost:3000/api/v1/cards")
    .then((response) => response.data);

  for (let card of cards) {
    const scryData = await axios
      .get(`https://api.scryfall.com/cards/${card.id}`)
      .then((response) => response.data);

    await axios.patch(
      `http://localhost:3000/api/v1/cards/${card.id}`,
      {
        usd: scryData.prices.usd,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  }
  
  const newData = await axios
  .get("http://localhost:3000/api/v1/cards")
  .then((response) => response.data);

  return newData
};

module.exports = {
  updateAllPrices,
};
