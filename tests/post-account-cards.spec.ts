import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";

const account_id = parameters.account_id;
const price = parameters.new_card.price;
const scry_id = parameters.new_card.scry_id;
const card_name = parameters.new_card.card_name;
const quantity = parameters.new_card.quantity;

const postCard = async (request) => {
  const data = {
    price: price,
    scry_id: scry_id,
    name: card_name,
    quantity: quantity,
  };
  let res = await request.post(`/api/v1/account/cards`, {
    data: data,
  });

  return res;
};

test.describe("POST cards tests", () => {
  test("POST Cards request should create new card when card does not exist in collection", async ({
    request,
  }) => {
    let res = await postCard(request);
    expect(res.ok()).toBeTruthy();
    let data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(scry_id);
    expect(data[0].card_name).toEqual(card_name);
    expect(data[0].quantity).toEqual(quantity);
    expect(data[0].price).toEqual(price.toString());

    res = await request.get(`/api/v1/account/cards?name=${card_name}`);
    expect(res.ok()).toBeTruthy();
    data = JSON.parse((await res.body()).toString());
    expect(data).not.toBeNull();
    expect(data.account_id).toEqual(account_id);
    expect(data.scry_id).toEqual(scry_id);
    expect(data.card_name).toEqual(card_name);
    expect(data.quantity).toEqual(quantity);
    expect(data.price).toEqual(price.toString());
  });

  test("POST Cards request should increase card quantity when card does exist in collection", async ({
    request,
  }) => {
    await postCard(request);
    const res = await postCard(request);
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(scry_id);
    expect(data[0].card_name).toEqual(card_name);
    expect(data[0].quantity).toEqual(quantity + 1);
    expect(data[0].price).toEqual(price.toString());
  });

  test.afterEach(async ({ request }) => {
    const res = await request.delete(`/api/v1/account/cards/${scry_id}`);
    expect(res.ok()).toBeTruthy();
  });
});
