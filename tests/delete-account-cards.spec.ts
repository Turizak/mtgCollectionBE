import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";
import { postCard } from "./constants/functions";

const body = {
    price: parameters.new_card.price,
    scry_id: parameters.new_card.scry_id,
    name: parameters.new_card.card_name,
    quantity: parameters.new_card.quantity,
  };

test.describe("Delete cards tests", () => {
  test("DELETE Cards request should delete card when card does exist in collection", async ({
    request,
  }) => {
    let res = await postCard(request, body);
    expect(res.ok()).toBeTruthy();
    res = await request.delete(`${parameters.routes.cards}/${body.scry_id}`);
    expect(res.ok()).toBeTruthy();
    res = await request.get(`${parameters.routes.cards}?name=${body.name}`);
    expect(res.ok()).toBeFalsy();
    expect(res.status()).toEqual(400);
  });

  test("DELETE Cards request should give error when card does exist in collection", async ({
    request,
  }) => {
    const res = await request.delete(`${parameters.routes.cards}/${body.scry_id}`);
    expect(res.ok()).toBeFalsy();
    expect(res.status()).toEqual(400);
  });

  test.afterEach(async ({ request }) => {
    const res = await request.delete(`${parameters.routes.cards}/${body.scry_id}`);
    expect(res.ok()).toBeFalsy();
  });
});
