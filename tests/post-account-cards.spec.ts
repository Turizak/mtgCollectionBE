import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";
import { postCard } from "./constants/functions";

const account_id = parameters.account_id;

const body = {
  price: parameters.new_card.price,
  scry_id: parameters.new_card.scry_id,
  name: parameters.new_card.card_name,
  quantity: parameters.new_card.quantity,
};

test.describe("POST cards tests", () => {
  test("POST Cards request should create new card when card does not exist in collection", async ({
    request,
  }) => {
    let res = await postCard(request, body);
    expect(res.ok()).toBeTruthy();
    let data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(body.scry_id);
    expect(data[0].card_name).toEqual(body.name);
    expect(data[0].quantity).toEqual(body.quantity);
    expect(data[0].price).toEqual(body.price.toString());

    res = await request.get(`${parameters.routes.cards}?name=${body.name}`);
    expect(res.ok()).toBeTruthy();
    data = JSON.parse((await res.body()).toString());
    expect(data).not.toBeNull();
    expect(data.account_id).toEqual(account_id);
    expect(data.scry_id).toEqual(body.scry_id);
    expect(data.card_name).toEqual(body.name);
    expect(data.quantity).toEqual(body.quantity);
    expect(data.price).toEqual(body.price.toString());
  });

  test("POST Cards request should increase card quantity when card does exist in collection", async ({
    request,
  }) => {
    await postCard(request, body);
    const res = await postCard(request, body);
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(body.scry_id);
    expect(data[0].card_name).toEqual(body.name);
    expect(data[0].quantity).toEqual(body.quantity + 1);
    expect(data[0].price).toEqual(body.price.toString());
  });

  test.afterEach(async ({ request }) => {
    const res = await request.delete(`${parameters.routes.cards}/${body.scry_id}`);
    expect(res.ok()).toBeTruthy();
  });
});
