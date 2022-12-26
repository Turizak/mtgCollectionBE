import type { PlaywrightTestConfig } from '@playwright/test';

require('dotenv').config();

const config: PlaywrightTestConfig = {
  workers: 1,
  use: {
    baseURL: 'https://mtgbe.fly.dev',
    extraHTTPHeaders: {
      'Accept': '*/*',
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json'
    },
  }
};
export default config;