export class HomePage {
    constructor(page) {
        this.page = page;
        this.listItems = page.locator(".card-body")
        this.loader = page.locator('ngx-spinner-overlay ng-tns-c31-1 ng-trigger ng-trigger-fadeIn ng-star-inserted')
        this.cart = page.locator("//button[@routerlink='/dashboard/cart']//label")
        this.toastMsg = page.locator("//div[@aria-label='Product Added To Cart']")
    }

    async AddToCart(item) {
        await this.listItems.first().waitFor();
        const listCount = await this.listItems.count();
        for (let i = 0; i < listCount; i++) {
            if (await this.listItems.nth(i).locator("b").textContent() === item) {
                await this.listItems.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        await this.page.waitForTimeout(2000)
        const cartCount = parseInt(await this.cart.textContent())
        const msg = (await this.toastMsg.textContent()).trim();
        if (cartCount >0 &&  msg === "Product Added To Cart"){
            return true
        }
        else {
            return false
        }
    }
    async cartButtonCLick() {
        await this.cart.click();
    }
}