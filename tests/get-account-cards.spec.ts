import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";

const account_id = parameters.account_id;
const scry_id = parameters.existing_card.scry_id;
const card_name = parameters.existing_card.card_name;
const bad_card_name = parameters.nonexisting_card.card_name;

test.describe("GET cards tests", () => {
  test("GET Cards request should recieve all cards associated with account", async ({
    request,
  }) => {
    const res = await request.get(`${parameters.routes.cards}`);
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toHaveLength(0);
    expect(data[0].account_id).toEqual(account_id);
    expect(data[0].scry_id).toEqual(scry_id);
    expect(data[0].card_name).toEqual(card_name);
  });

  test("GET Cards request with ?name= query parameter should recieve that card information", async ({
    request,
  }) => {
    const res = await request.get(`${parameters.routes.cards}?name=${card_name}`);
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toBeNull();
    expect(data.account_id).toEqual(account_id);
    expect(data.scry_id).toEqual(scry_id);
    expect(data.card_name).toEqual(card_name);
  });

  test("GET Cards request with ?name= query parameter for card not in collection should return error message", async ({
    request,
  }) => {
    const res = await request.get(
      `${parameters.routes.cards}?name=${bad_card_name}`
    );
    expect(res.status()).toEqual(400);
    const data = JSON.parse((await res.body()).toString());
    expect(data).not.toBeNull();
    expect(data.result).toEqual(`Card: ${bad_card_name} not found!`);
  });
});
