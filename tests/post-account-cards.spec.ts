import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";

const account_id = parameters.account_id;
const usd = parameters.new_card.usd;
const scry_id = parameters.new_card.scry_id;
const card_name = parameters.new_card.card_name;
const quantity = parameters.new_card.quantity;

test.describe("POST cards tests", () => {
  test("POST Cards request should create new card when card does not exist in collection", async ({
    request,
  }) => {
    let res = await request.post(`/api/v1/account/cards`, {
      data: {
        usd: usd,
        scry_id: scry_id,
        name: card_name,
        quantity: quantity,
      },
    });
    expect(res.ok()).toBeTruthy();
    let data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(scry_id);
    expect(data[0].card_name).toEqual(card_name);
    expect(data[0].quantity).toEqual(quantity);
    expect(data[0].price).toEqual(usd.toString());

    res = await request.get(
      `/api/v1/account/cards?name=${card_name}`
    );
    expect(res.ok()).toBeTruthy();
    data = JSON.parse((await res.body()).toString());
    expect(data).not.toBeNull();
    expect(data.account_id).toEqual(account_id);
    expect(data.scry_id).toEqual(scry_id);
    expect(data.card_name).toEqual(card_name);
    expect(data.quantity).toEqual(quantity);
    expect(data.price).toEqual(usd.toString());
  });

  test("POST Cards request should increase card quantity when card does exist in collection", async ({
    request,
  }) => {
    await request.post(`/api/v1/account/cards`, {
      data: {
        usd: usd,
        scry_id: scry_id,
        name: card_name,
        quantity: quantity,
      },
    });
    const res = await request.post(`/api/v1/account/cards`, {
      data: {
        usd: usd,
        scry_id: scry_id,
        name: card_name,
        quantity: quantity,
      },
    });
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(scry_id);
    expect(data[0].card_name).toEqual(card_name);
    expect(data[0].quantity).toEqual(quantity + 1);
    expect(data[0].price).toEqual(usd.toString());
  });

  test.afterEach(async ({ request }) => {
    const res = await request.delete(`/api/v1/account/cards/${scry_id}`);
    expect(res.ok()).toBeTruthy();
  });
});
