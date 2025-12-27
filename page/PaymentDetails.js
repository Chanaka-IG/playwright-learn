export class PaymentDetails {
    constructor(page) {

            this.creditCardCountry = page.locator("[placeholder='Select Country']")
            this.expiryMonth = page.locator("(//select[@class='input ddl'])[1]")
            this.expiryDate = page.locator("(//select[@class='input ddl'])[2]")
            this.cvv = page.locator("(//input[@class='input txt'])[1]")
            this.nameOnCard = page.locator("(//input[@class='input txt'])[2]")
            this.coupon = page.locator("[name='coupon']")
            this.couponApply = page.locator("button",{hasText : 'Apply Coupon'})
            this.couponValidation = page.locator("//div[@class='field small']//p[1]")
            this.shoppingEmail = page.locator(".user__name [type='text']").first()
            this.countryDropdown = page.locator("//input[@placeholder='Select Country']")
            this.listItem = page.locator("//div[@class='form-group']//section[1]")
            this.placeOrderBtn = page.locator("//a[normalize-space(text())='Place Order']")

    }


    async fillPaymentDetails(myEmail,creditCardCountry,expiryMonth,expiryDate,cvv,nameOnCard,coupon){
            let flag = true;
            await this.expiryMonth.selectOption(expiryMonth)
            await this.expiryDate.selectOption(expiryDate)
            await this.cvv.fill(cvv)
            await this.nameOnCard.fill(nameOnCard)
            await this.coupon.fill(coupon)
            await this.couponApply.click();
            const couponMsg = await this.couponValidation.textContent()
            await this.couponValidation.waitFor({state:'visible'})
            const shoppingMail =  await this.shoppingEmail.textContent()
            if (couponMsg !=="Coupon Applied" && shoppingMail !== myEmail ){
                console.log(couponMsg)
                console.log(shoppingMail,myEmail)
                flag = false;
            }
            await this.countryDropdown.click().then(this.countryDropdown.clear());
            await this.countryDropdown.pressSequentially(creditCardCountry);
            await this.listItem.waitFor({state:'visible'})
            await this.listItem.filter({hasText: creditCardCountry}).click();
        
            return flag;
   
        }

     async clickPlaceOrderBtn() {
            await this.placeOrderBtn.click();
     }   
    
}