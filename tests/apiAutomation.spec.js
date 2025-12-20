const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('./Utils/APiutils')
const { APiOrange } = require('./Utils/APiOrange')

let response;


test.beforeAll("Api Automation test", async () => {
    const dataSet = { userEmail: "igcpa@gmail.com", userPassword: "0773379002Chanaka!" };
    const orderSet = { orders: [{ country: "Argentina", productOrderedId: "68a961719320a140fe1ca57c" }] }
    const apiContext = await request.newContext();
    const APiUtil = new APiUtils(apiContext, dataSet);
    response = await APiUtil.createOrder(orderSet);
    console.log(response);

})

test("End to end test for e-commerse site", async ({ page }) => {
    const myEmail = "igcpa@gmail.com"
    const email = page.getByPlaceholder("email@example.com")
    const password = page.getByPlaceholder("enter your passsword")
    const login = page.getByRole("button", { name: "Login" })
    const listItems = page.locator(".card-body")
    const cart = page.locator("//button[@routerlink='/dashboard/cart']//label")
    const toastMsg = page.locator("//div[@aria-label='Product Added To Cart']")
    const cartTitle = page.getByText("My Cart")
    const itemNumber = page.locator("p.itemNumber")
    const selectedItem = page.locator("//div[@class='cartSection']//h3")
    const checkouButton = page.getByRole('button', { name: 'Checkout' })
    const creditCard = page.locator("[placeholder='Select Country']")
    const expiryMonth = page.locator("(//select[@class='input ddl'])[1]")
    const expiryDate = page.locator("(//select[@class='input ddl'])[2]")
    const cvv = page.locator("(//input[@class='input txt'])[1]")
    const nameOnCard = page.locator("(//input[@class='input txt'])[2]")
    const coupon = page.locator("[name='coupon']")
    const couponApply = page.locator("button", { hasText: 'Apply Coupon' })
    const couponValidation = page.locator("//div[@class='field small']//p[1]")
    const shoppingEmail = page.locator(".user__name [type='text']").first()
    const countryDropdown = page.getByPlaceholder("Select Country")
    const listItem = page.locator(".ta-results list-group ng-star-inserted")
    const australiaButton = page.getByRole('button', { name: 'Australia' })

    const placeOrderBtn = page.getByText("PLACE ORDER")
    const orderConfirmnedID = page.locator("//tr[@class='ng-star-inserted']//label")
    const historyPage = page.locator("//label[normalize-space(text())='Orders History Page']")


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders")
    const prodName = await page.locator("//tbody//tr").filter({ hasText: response.orderID }).locator('td').nth(1).textContent();
    console.log(prodName)
    expect(prodName).toEqual("ADIDAS ORIGINAL")
});
