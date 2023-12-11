import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";

test.use({
  extraHTTPHeaders: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

test.describe("Login tests", () => {
  test.skip("Should send login request and recieve an auth token", async ({
    request,
  }) => {
    const res = await request.post(`${parameters.routes.login}`, {
      data: {
        username: `${process.env.USER}`,
        password: `${process.env.PASSWORD}`,
      },
    });
    // expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    console.log(data);
    // expect(data.token).not.toHaveLength(0);
  });
});
