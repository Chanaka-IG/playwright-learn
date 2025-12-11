const {test, expect} = require(`@playwright/test`);

test("End to end test for e-commerse site", async({page})=> {

    const myEmail = "igcpa@gmail.com"
    const email = page.getByPlaceholder("email@example.com")
    const password = page.getByPlaceholder("enter your passsword")
    const login = page.getByRole("button", {name: "Login"})
    const listItems = page.locator(".card-body")
    const cart = page.locator("//button[@routerlink='/dashboard/cart']//label")
    const toastMsg = page.locator("//div[@aria-label='Product Added To Cart']")
    const cartTitle = page.getByText("My Cart")
    const itemNumber = page.locator("p.itemNumber")
    const selectedItem = page.locator("//div[@class='cartSection']//h3")
    const checkouButton= page.getByRole('button',{name : 'Checkout'})
    const creditCard = page.locator("[placeholder='Select Country']")
    const expiryMonth = page.locator("(//select[@class='input ddl'])[1]")
    const expiryDate = page.locator("(//select[@class='input ddl'])[2]")
    const cvv = page.locator("(//input[@class='input txt'])[1]")
    const nameOnCard = page.locator("(//input[@class='input txt'])[2]")
    const coupon = page.locator("[name='coupon']")
    const couponApply = page.locator("button",{hasText : 'Apply Coupon'})
    const couponValidation = page.locator("//div[@class='field small']//p[1]")
    const shoppingEmail = page.locator(".user__name [type='text']").first()
    const countryDropdown = page.getByPlaceholder("Select Country")
    const listItem = page.locator(".ta-results list-group ng-star-inserted")
    const australiaButton = page.getByRole('button', {name:'Australia'})

    const placeOrderBtn = page.getByText("PLACE ORDER")
    const orderConfirmnedID = page.locator("//tr[@class='ng-star-inserted']//label")
    const historyPage = page.locator("//label[normalize-space(text())='Orders History Page']")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await email.fill(myEmail)
    await password.fill("0773379002Chanaka!")
    await login.click()
    await page.waitForLoadState('networkidle');
    await listItems.filter({hasText:'ADIDAS ORIGINAL'}).getByRole("button",{name:" Add To Cart"}).click();
    await page.waitForTimeout(2000)
    const cartCount = parseInt(await cart.textContent())
    expect(cartCount).toBeLessThanOrEqual(1);
    const msg = (await toastMsg.textContent()).trim();
    expect(msg).toEqual("Product Added To Cart")
    await cart.click();
    await cartTitle.waitFor({state: 'visible'})
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
    await couponValidation.waitFor({state:'visible'})
    expect (couponValidation).toContainText("Coupon Applied")
    await shoppingEmail.textContent().then( value => {
        expect (value).toContain(myEmail)
    })
    await countryDropdown.click().then(countryDropdown.clear());
    await countryDropdown.pressSequentially("Aus");
    await australiaButton.click();
    await placeOrderBtn.click();
    const orderText = await orderConfirmnedID.textContent();
    const ordereID = orderText ? orderText.replace(/[|\s]/g, ''): null;
    console.log(ordereID)
    await historyPage.click();  

    // await orderConfirmnedID.textContent().then(value => {
    //     expect(value).toEqual(itmNumb)
    // })
    await page.waitForTimeout(5000)
    const prodName =await page.locator("//tbody//tr").filter({ hasText: ordereID }).locator('td').nth(1).textContent();
    console.log(prodName)
    expect (prodName).toEqual("ADIDAS ORIGINAL")
});
