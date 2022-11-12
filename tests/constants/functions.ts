import { parameters } from "./parameters";

const postCard = async (request, body) => {
  const data = {
    price: body.price,
    scry_id: body.scry_id,
    name: body.name,
    quantity: body.quantity,
  };
  let res = await request.post(`${parameters.routes.cards}`, {
    data: data,
  });

  return res;
};

const patchCardPrice = async (request, card, price = 0) => {
  const data = {
    price: card.price + price,
  };
  let res = await request.patch(`${parameters.routes.cards}/${card.scry_id}`, {
    data: data,
  });

  return res;
};

const putCard = async (request, card, price = 0, qty = 0) => {
  const data = {
    price: card.price + price,
    name: card.card_name,
    quantity: card.quantity + qty,
  };
  let res = await request.put(`${parameters.routes.cards}/${card.scry_id}`, {
    data: data,
  });

  return res;
};

export { postCard, patchCardPrice, putCard };
