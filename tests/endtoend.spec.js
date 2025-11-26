const {test, expect} = require(`@playwright/test`)

test("End to end test for e-commerse site", async({page})=> {
    const email = page.locator("[id='userEmail']")
    const password = page.locator("[id='userPassword']")
    const titleText = page.locator(".card-body b").nth(0)
    const submit = page.locator("[id='login']")
    const listItems = page.locator(".card-body")
    const loader = page.locator('ngx-spinner-overlay ng-tns-c31-1 ng-trigger ng-trigger-fadeIn ng-star-inserted')
    const cart = page.locator("//button[@routerlink='/dashboard/cart']//label")
    const toastMsg = page.locator("//div[@aria-label='Product Added To Cart']")
    const cartTitle = page.locator("//div[@class='heading cf']//h1")
    const itemNumber = page.locator("p.itemNumber")
    const selectedItem = page.locator("//div[@class='cartSection']//h3")
    const checkouButton= page.locator('button',{hasText : 'Checkout'})
    const creditCard = page.locator("[placeholder='Select Country']")
    const expiryMonth = page.locator("(//select[@class='input ddl'])[1]")
    const expiryDate = page.locator("(//select[@class='input ddl'])[2]")
    const cvv = page.locator("(//input[@class='input txt'])[1]")
    const nameOnCard = page.locator("(//input[@class='input txt'])[2]")
    const coupon = page.locator("[name='coupon']")
    const couponApply = page.locator("button",{hasText : 'Apply Coupon'})
    const couponValidation = page.locator("//div[@class='field small']//p[1]")
    const shoppingEmail = page.locator("//div[@class='user__name mt-5']//input").nth(0)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await email.fill("igcpa@gmail.com")
    await password.fill("0773379002Chanaka!")
    await submit.click()

    await page.waitForLoadState('networkidle');
    const adidas = listItems.nth(1);
    await adidas.locator("button").nth(1).click();
    // await loader.waitFor( {state:'visible' } )
    // console.log(await cart.isVisible())
    await page.waitForTimeout(2000)
    const cartCount = parseInt(await cart.textContent())
    expect(cartCount).toBeLessThanOrEqual(1);
    const msg = (await toastMsg.textContent()).trim();
    expect(msg).toEqual("Product Added To Cart")
    await cart.click();
    await cartTitle.waitFor({state: 'visible'})

    await expect(cartTitle).toHaveText("My Cart")
    await expect(selectedItem).toHaveText("ADIDAS ORIGINAL")
    const itmNumb= await itemNumber.textContent()

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
    await couponValidation.waitFor({state:'visible'})
    expect (couponValidation).toContainText("Coupon Applied")
    await shoppingEmail.inputValue().then( value => {
        expect(value).toContain("igcpa@gmail.com")
    })
});
