const {test, expect} = require(`@playwright/test`)


test('Second test',async({page}) => {

    const username = page.locator('#username')
    const password = page.locator("[type='password']")
    const submit = page.locator("[value='Sign In']")
    const userCheckBox = page.locator("[value='user']")
    const admin = page.locator("[value='admin']")
    const okayBtn = page.locator("#okayBtn")
    const dropdown = page.locator("select.form-control")
    const blinkText = page.locator("[href*='documents']")

    const iphoneText = page.locator(".card-body a").nth(0)


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await username.fill("rahulshettyacademy");
    await password.fill("learning")
    await userCheckBox.check();
    await okayBtn.click();
    await dropdown.selectOption("Teacher");
    await submit.click();

    expect (await admin.isChecked()).toBeFalsy();
    await expect(blinkText).toHaveAttribute("class","blinkingText")
    expect (await iphoneText.textContent()).toEqual("iphone X")

})


test("Validate the functionalities on newly opened tab", async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username')
    const blinkText = page.locator("[href*='documents']")
    const redText = page.locator(".im-para red")


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkText.click()
    ])

    const text1 = await newPage.locator(".red").textContent();
    
    const textval1 = text1.split("@")[1]
    const textval2 = textval1.split(" ")[0]
    console.log(textval2)

    await page.locator("#username").fill(textval2);
    expect (await page.locator("#username").inputValue()).toEqual("rahulshettyacademy.com");


})