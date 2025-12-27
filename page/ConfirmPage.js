export class ConfirmPage {
    constructor(page) {
        this.orderConfirmnedID = page.locator("//tr[@class='ng-star-inserted']//label")
        this.historyPage = page.getByText("Orders History Page")


    }

    async orderConfirmdText() {
        return this.orderConfirmnedID.textContent();
    }
    async historyBtnclick() {
        await this.historyPage.click();
    }
}
 