export class CartDetails {
    constructor(page) {
        this.page = page
        this.cartTitle = page.locator("//div[@class='heading cf']//h1")
        this.itemNumber = page.locator("p.itemNumber")
        this.selectedItem = page.locator("//div[@class='cartSection']//h3")
        this.checkouButton = page.locator('button', { hasText: 'Checkout' })
    }

    async validateCartDetaills(item) {
        await this.cartTitle.waitFor({ state: 'visible' })
        const cartTitle = (await this.cartTitle.textContent()).trim();
        const selectedItemName = (await this.selectedItem.textContent()).trim();
        if (cartTitle === "My Cart"  &&  selectedItemName === "ADIDAS ORIGINAL")
            return true
        else
            return false
    }

    async clickCheckout() {
        await this.checkouButton.click();
        await this.page.waitForTimeout(4000)
    }
}