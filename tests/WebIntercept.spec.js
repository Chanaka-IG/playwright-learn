const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('./Utils/APiutils')
const { APiOrange } = require('./Utils/APiOrange');
const { text } = require('stream/consumers');
const fakeBody = { data: [], message: "No Orders" }



test("End to end test for e-commerse site", async ({ page }) => {
  const myOrders = page.locator("[routerlink*='myorders']")
  const textArea = page.locator(".mt-4")
  const email = page.locator("[id='userEmail']")
  const password = page.locator("[id='userPassword']")
  const submit = page.locator("[id='login']")

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
  await email.fill("igcpa@gmail.com")
  await password.fill("0773379002Chanaka!")
  await submit.click()

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(fakeBody);
      route.fulfill({
        response,
        body
      })
    }
  )
  await myOrders.click()
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await textArea.textContent())



});
