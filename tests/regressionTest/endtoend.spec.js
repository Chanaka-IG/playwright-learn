const {test, expect} = require(`@playwright/test`);
const { customTest } = require("../../Utils/test-base");
const {POmanager} = require("../../page/POmanager");
const dataset = require("../../Utils/endtoendData.json");

for (const data of dataset) {
test(`End to end test for e-commerse site ${data.item}`, async({page})=> {
    const pomanager = new POmanager(page);
    const loginPage = await pomanager.getLoginPage();
    const homePage = await pomanager.getHomePage();
    const cartDetails = await pomanager.getCartDetails();
    const paymentDetails = await pomanager.getPaymentDetails();
    const confirmPage = await pomanager.getConfirmPage();
    const historyPage = await pomanager.getHistoryPage();
    const myEmail = data.myEmail;
    const password = data.password;
    const item = data.item;
    const creditCardCountry = data.creditCCardCountry;
    const expiryMonth = data.expiryMMonth;
    const expiryDate = data.expiryDDate;
    const cvv = data.cvv;
    const nameOnCard = data.nameOnCCard;
    const coupon = data.coupon;
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.fillLogin(myEmail,password);
    expect (homePage.AddToCart(item)).toBeTruthy();
    await homePage.cartButtonCLick();
    expect (cartDetails.validateCartDetaills(item)).toBeTruthy();
    await cartDetails.clickCheckout();
    expect (await paymentDetails.fillPaymentDetails(myEmail,creditCardCountry,expiryMonth,expiryDate,cvv,nameOnCard,coupon)).toBeTruthy();
    await paymentDetails.clickPlaceOrderBtn();
    const orderText = await confirmPage.orderConfirmdText();
    const ordereID = orderText ? orderText.replace(/[|\s]/g, ''): null;
    await confirmPage.historyBtnclick();  
    await page.waitForTimeout(4000)
    const {selectedROw,prodName} = await historyPage.getOrderName(ordereID);
    expect (prodName).toEqual(data.item)
    await historyPage.selectView(selectedROw);
  
});
}

customTest(`End to end test for e-commerse site`, async({page,testData})=> {
    const pomanager = new POmanager(page);
    const loginPage = await pomanager.getLoginPage();
    const myEmail = testData.myEmail;
    const password = testData.password;
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await loginPage.fillLogin(myEmail,password);

});