const { test, expect } = require('@playwright/test')

let webStorage;


test.beforeAll(async ({ browser }) => {

    const myEmail = "igcpa@gmail.com"
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = page.locator("#userEmail")
    const submit = page.locator("#login")
    const password = page.locator("[id='userPassword']")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await email.fill(myEmail)
    await password.fill("0773379002Chanaka!")
    await submit.click()
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'storage.json' })

    webStorage = await browser.newContext({ storageState: 'storage.json' })

})


test('API automation part 2', async () => {
    const myEmail = "igcpa@gmail.com"
    const page = await webStorage.newPage();
    const titleText = page.locator(".card-body b").nth(0)
    const listItems = page.locator(".card-body")
    const loader = page.locator('ngx-spinner-overlay ng-tns-c31-1 ng-trigger ng-trigger-fadeIn ng-star-inserted')
    const cart = page.locator("//button[@routerlink='/dashboard/cart']//label")
    const toastMsg = page.locator("//div[@aria-label='Product Added To Cart']")
    const cartTitle = page.locator("//div[@class='heading cf']//h1")
    const itemNumber = page.locator("p.itemNumber")
    const selectedItem = page.locator("//div[@class='cartSection']//h3")
    const checkouButton = page.locator('button', { hasText: 'Checkout' })
    const creditCard = page.locator("[placeholder='Select Country']")
    const expiryMonth = page.locator("(//select[@class='input ddl'])[1]")
    const expiryDate = page.locator("(//select[@class='input ddl'])[2]")
    const cvv = page.locator("(//input[@class='input txt'])[1]")
    const nameOnCard = page.locator("(//input[@class='input txt'])[2]")
    const coupon = page.locator("[name='coupon']")
    const couponApply = page.locator("button", { hasText: 'Apply Coupon' })
    const couponValidation = page.locator("//div[@class='field small']//p[1]")
    const shoppingEmail = page.locator(".user__name [type='text']").first()
    const countryDropdown = page.locator("//input[@placeholder='Select Country']")
    const listItem = page.locator("//div[@class='form-group']//section[1]")
    const placeOrderBtn = page.locator("//a[normalize-space(text())='Place Order']")
    const orderConfirmnedID = page.locator("//tr[@class='ng-star-inserted']//label")
    const historyPage = page.locator("//label[normalize-space(text())='Orders History Page']")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await listItems.first().waitFor();
    const listCount = await listItems.count();
    await page.on("request", request => console.log(request.url()))
    await page.on("response", response => console.log(response.url(), response.status()))
    for (let i = 0; i < listCount; i++) {
        if (await listItems.nth(i).locator("b").textContent() === "ADIDAS ORIGINAL") {
            await listItems.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.waitForTimeout(2000)
    const cartCount = parseInt(await cart.textContent())
    expect(cartCount).toBeLessThanOrEqual(1);
    const msg = (await toastMsg.textContent()).trim();
    expect(msg).toEqual("Product Added To Cart")
    await cart.click();
    await cartTitle.waitFor({ state: 'visible' })

    await expect(cartTitle).toHaveText("My Cart")
    await expect(selectedItem).toHaveText("ADIDAS ORIGINAL")
    await checkouButton.click();

    await page.waitForTimeout(4000)

    await creditCard.fill("Sri Lanka");
    await expiryMonth.selectOption("10")
    await expiryDate.selectOption("25")
    await cvv.fill("123")
    await nameOnCard.fill("Chanaka Prasad")
    await coupon.fill("rahulshettyacademy")
    await couponApply.click();
    const couponMsg = await couponValidation.textContent()
    await couponValidation.waitFor({ state: 'visible' })
    expect(couponValidation).toContainText("Coupon Applied")
    await shoppingEmail.textContent().then(value => {
        expect(value).toContain(myEmail)
    })
    await countryDropdown.click().then(countryDropdown.clear());
    await countryDropdown.pressSequentially("Aus");
    await listItem.waitFor({ state: 'visible' })
    await listItem.filter({ hasText: 'Austria' }).click();

    await placeOrderBtn.click();
    const orderText = await orderConfirmnedID.textContent();
    const ordereID = orderText ? orderText.replace(/[|\s]/g, '') : null;
    console.log(ordereID)
    await historyPage.click();

    // await orderConfirmnedID.textContent().then(value => {
    //     expect(value).toEqual(itmNumb)
    // })
    await page.waitForTimeout(5000)
    const row = page.locator("//tbody//tr")
    const selectedROw = row.filter({ hasText: ordereID });

    const prodName = (await selectedROw.locator('td').nth(1).textContent())
    expect(prodName).toEqual("ADIDAS ORIGINAL")
    await selectedROw.locator('td').nth(4).click();
    await page.waitForTimeout(3000)

})