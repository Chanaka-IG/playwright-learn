export class LoginPage {
    constructor(page) {
        this.email = page.locator("[id='userEmail']")
        this.password = page.locator("[id='userPassword']")
        this.titleText = page.locator(".card-body b").nth(0)
        this.submit = page.locator("[id='login']")
        this.page = page
    }

    async fillLogin(myEmail,password) {
        await this.email.fill(myEmail)
        await this.password.fill(password)
        await this.submit.click()
        await this.page.waitForLoadState('networkidle');
    }
}