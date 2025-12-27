const {LoginPage} = require('../page/LoginPage')
const {HomePage} = require('../page/HomePage')
const {CartDetails} = require('../page/CartDetails')
const {PaymentDetails} = require('../page/PaymentDetails')
const {ConfirmPage} = require('../page/ConfirmPage')
const {HistoryPage} = require('../page/HistoryPage')

export class POmanager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.cartDetails = new CartDetails(this.page)
        this.paymentDetails = new PaymentDetails(this.page)
        this.confirmPage = new ConfirmPage(this.page)
        this.historyPage = new HistoryPage(this.page)
    }


    async getLoginPage() {
        return this.loginPage
    }

    async getHomePage() {    
        return this.homePage
    }

    async getCartDetails() {
        return this.cartDetails
    }

    async getPaymentDetails() {
        return this.paymentDetails
    }

    async getConfirmPage() {
        return this.confirmPage
    }

    async getHistoryPage() {
        return this.historyPage
    }


}

