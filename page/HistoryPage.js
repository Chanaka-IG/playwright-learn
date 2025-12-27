export class HistoryPage {
    constructor(page) {
        this.page = page;
        this.row = page.locator("//tbody//tr")
    }
    async getOrderName (ordereID) {
            const selectedROw = this.row.filter({ hasText: ordereID });
            const prodName = (await selectedROw.locator('td').nth(1).textContent())
            return {selectedROw,prodName}
    }
    async selectView (selectedROw){
          await selectedROw.locator('td').nth(4).click();
          await this.page.waitForTimeout(3000)
    }
}