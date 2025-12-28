// @ts-check
import { chromium, devices, firefox } from '@playwright/test';
import { permission } from 'process';
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
  retries: 1,   //retry failed test once
  workers: 2,   //parallel test execution (two at a time)

  timeout: 30 * 1000, //this wait for the tests (by default its 30s)

  expect: {
    timeout: 4 * 1000    //this wait for assertion
  },

  reporter: 'html',   //report

  projects: [{
    name: "Edge",   //chromium based edge browser
    use: {
      browser: 'chromium',
      headless: false,
      ...devices['iPhone 12'],
      screenshot: 'retain-on-failure',
      trace: 'on',
      video: 'on'
    }
  },
  {
    name: "Firefox",
    use: {
      browser: 'firefox',   //firefox browser
      headless: false,
      viewport: { width: 1280, height: 720 },
      Permissions: ['geolocation'],
      ignorehttpserrors: true,
      screenshot: 'only-on-failure',
      trace: 'on-first-retry',
      video: 'retain-on-failure'
    }
  }
]
});

module.exports = config   //export config