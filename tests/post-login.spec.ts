import { test, expect } from "@playwright/test";
import { parameters } from "./constants/parameters";

test.use({
  extraHTTPHeaders: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

test.describe("Login tests", () => {
  test("Should send login request and recieve an auth token", async ({
    request,
  }) => {
    const res = await request.post(`/api/v1/login`, {
      data: {
        username: parameters.username,
        password: parameters.password,
      },
    });
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse((await res.body()).toString());
    expect(data.token).not.toHaveLength(0);
  });
});
