// @ts-check
import { chromium } from '@playwright/test';

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

  timeout: 30*1000, //this wait for the tests (by default its 30s)
  retries: 1,   //retry failed test once
  workers: 1,    //parallel test execution (two at a time)

  expect : {
    timeout : 4 * 1000    //this wait for assertion
  },

  reporter : [["line"], ["allure-playwright"]],   //report
  use: {
    browser : chromium,
    headless: true,
    screenshot : 'retain-on-failure',
    trace: 'on',
    video: 'on'   
  }


});

module.exports = config