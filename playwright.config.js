// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout: 100*1000, //this wait for the tests (by default its 30s)

  expect : {
    timeout : 4 * 1000    //this wait for assertion
  },

  reporter : 'html',   //report
  use: {
    browser : chromium,
    headless: false,
    screenshot : 'retain-on-failure',
    trace: 'on',
    video: 'on'   
  }


});

module.exports = config