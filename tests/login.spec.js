const {test,expect} = require(`@playwright/test`) 

test("Create an account by signing up", async({page})=> {
    
    const registerLink = page.locator(".login-wrapper-footer-text a")
    const firstName = page.locator("[type='firstName']")
    const lastName = page.locator("[type='lastName']")
    const email = page.locator("[type='email']")
    const mobile = page.locator("[id='userMobile']")
    const password = page.locator("[formcontrolname='userPassword']")
    const confirmpassword = page.locator("[formcontrolname='confirmPassword']")
    const submitBtn = page.locator("[type='submit']")
    const requiredCheckBox = page.locator("[formcontrolname='required']")
    const successMsg = page.locator('[class="headcolor"]')

    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await registerLink.click();
    await firstName.fill("Chanaka")
    await lastName.fill("Prasad")
    await email.fill("igcpa@gmail.com")
    await mobile.fill("3695874589")
    await password.fill("0773379002Chanaka!")
    await confirmpassword.fill("0773379002Chanaka!")
    await requiredCheckBox.check();
    await submitBtn.click();

    expect (await successMsg.textContent()).toEqual("Account Created Successfully")
})

test("Login with the signup credentials", async({page})=> {

    const email = page.locator("[id='userEmail']")
    const password = page.locator("[id='userPassword']")
    const titleText = page.locator(".card-body b").nth(0)
    const submit = page.locator("[id='login']")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await email.fill("igcpa@gmail.com")
    await password.fill("0773379002Chanaka!")
    await submit.click()

    await page.waitForLoadState('networkidle')

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles)


    expect (await titleText.textContent()).toEqual('ZARA COAT 3')
})
