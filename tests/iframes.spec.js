const {test,expect} = require('@playwright/test')
const { text } = require('stream/consumers')

test("Validate funtion in a iframe", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    const framePage = page.frameLocator("#courses-iframe")
    const allAccess = framePage.locator("(//div[contains(@class,'hidden md:flex')]//a)[1]")
    await allAccess.click()
    const textContent = await framePage.locator(".text-center").allTextContents()
    const finalText = textContent.filter(text => text.includes("Happy Subscribers"))
    console.log(finalText)



})





